package main

import (
    "database/sql"
    "fmt"
    "log"
    "os"
    "net/http"
     "encoding/json"
    "io/ioutil"
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promauto"
    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    _ "github.com/lib/pq"
)


var (
    opsProcessed = promauto.NewCounter(prometheus.CounterOpts{
        Name: "myapp_processed_ops_total",
        Help: "The total number of processed events",
    })
)

func recordMetrics(c *gin.Context) {
    go func() {
        for {
            opsProcessed.Inc()
            
            
        }
        c.JSON(http.StatusOK, opsProcessed)
    }()
}

func verifyToken(c *gin.Context) {
    token := c.GetHeader("Authorization")

     // Ignorar la ruta /metrics
     if c.Request.URL.Path == "/metrics" {
        c.Next()
        
    }




    if token == "" {
        c.JSON(http.StatusUnauthorized, gin.H{"msg": "Missing token"})
        c.Abort()
        return
    }

    authServiceURI := os.Getenv("AUTH_SERVICE_URI")
    resp, err := http.Post(authServiceURI+"/auth/verify", "application/json", nil)
    if err != nil || resp.StatusCode != 200 {
        c.JSON(http.StatusUnauthorized, gin.H{"msg": "Invalid token"})
        c.Abort()
        return
    }

    body, _ := ioutil.ReadAll(resp.Body)
    var result map[string]interface{}
    json.Unmarshal(body, &result)
    c.Set("user", result["user"])
    c.Next()
}

type Projecte struct {
    ID          int     `json:"id_projecte"`
    Nom         string  `json:"nom_projecte"`
    Descripcio  string  `json:"descripcio"`
    DataInici   string  `json:"data_inici"`
    DataFinal   string  `json:"data_final"`
    Estat       string  `json:"estat"`
    Pressupost  float64 `json:"pressupost"`
    TotalRecaptat float64 `json:"total_recaptat"`
}

type Donacio struct {
    ID          int     `json:"id_donacio"`
    IDProjecte  int     `json:"id_projecte"`
    Import      float64 `json:"import"`
    Data        string  `json:"data"`
    IDDonant    int     `json:"id_donant"`
}

var db *sql.DB

func initDB() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

   // Crea la cadena de conexión usando fmt.Sprintf y variables de entorno
   psqlInfo := fmt.Sprintf(
    "host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
    os.Getenv("POSTGRES_HOST"),
    os.Getenv("POSTGRES_PORT"),
    os.Getenv("POSTGRES_USER"),
    os.Getenv("POSTGRES_PASSWORD"),
    os.Getenv("POSTGRES_DB"),
)

// Abre una conexión con la base de datos
db, err := sql.Open("postgres", psqlInfo)
if err != nil {
    fmt.Printf("Error abriendo la conexión con la base de datos: %v\n", err)
    return
}
defer db.Close() // Asegúrate de cerrar la conexión cuando el programa termine

// Comprueba que la conexión sea válida
err = db.Ping()
if err != nil {
    fmt.Printf("No se pudo conectar con la base de datos: %v\n", err)
    return
}

fmt.Println("Conexión exitosa con la base de datos!")
}

func main() {
    initDB()
    defer db.Close()

    r := gin.Default()
    r.Use(verifyToken)  // Aplicar el middleware globalmente

    

    r.GET("/metrics", recordMetrics)

    r.GET("/", homeHandler)
    r.GET("/projects", getProjects)
    r.POST("/projects", createProject)
    r.PUT("/projects/update", updateProjectStatus)
    r.POST("/donations/create", createDonation)

    r.Run(":8080")
}

func homeHandler(c *gin.Context) {
    message := "Este es el microservicio de gestión de proyectos.\n\nTablas disponibles:\n"

    rows, err := db.Query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
    `)
    if err != nil {
        c.String(http.StatusInternalServerError, err.Error())
        return
    }
    defer rows.Close()

    for rows.Next() {
        var tableName string
        if err := rows.Scan(&tableName); err != nil {
            c.String(http.StatusInternalServerError, err.Error())
            return
        }
        message += "- " + tableName + "\n"
    }

    c.String(http.StatusOK, message)
}

func getProjects(c *gin.Context) {
    rows, err := db.Query("SELECT * FROM Projecte")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer rows.Close()

    var projects []Projecte
    for rows.Next() {
        var p Projecte
        if err := rows.Scan(&p.ID, &p.Nom, &p.Descripcio, &p.DataInici, &p.DataFinal, &p.Estat, &p.Pressupost, &p.TotalRecaptat); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        projects = append(projects, p)
    }

    c.JSON(http.StatusOK, projects)
}

func createProject(c *gin.Context) {
    var p Projecte
    if err := c.ShouldBindJSON(&p); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    sqlStatement := `
    INSERT INTO Projecte (nom_projecte, descripcio, data_inici, data_final, estat, pressupost, total_recaptat)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id_projecte`
    id := 0
    err := db.QueryRow(sqlStatement, p.Nom, p.Descripcio, p.DataInici, p.DataFinal, p.Estat, p.Pressupost, p.TotalRecaptat).Scan(&id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    p.ID = id
    c.JSON(http.StatusOK, p)
}

func updateProjectStatus(c *gin.Context) {
    var p Projecte
    if err := c.ShouldBindJSON(&p); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    sqlStatement := `UPDATE Projecte SET estat=$1 WHERE id_projecte=$2`
    _, err := db.Exec(sqlStatement, p.Estat, p.ID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.Status(http.StatusOK)
}

func createDonation(c *gin.Context) {
    var d Donacio
    if err := c.ShouldBindJSON(&d); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    sqlStatement := `
    INSERT INTO Donacio (id_projecte, import, data, id_donant)
    VALUES ($1, $2, $3, $4)
    RETURNING id_donacio`
    id := 0
    err := db.QueryRow(sqlStatement, d.IDProjecte, d.Import, d.Data, d.IDDonant).Scan(&id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    updateStatement := `UPDATE Projecte SET total_recaptat = total_recaptat + $1 WHERE id_projecte = $2`
    _, err = db.Exec(updateStatement, d.Import, d.IDProjecte)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    d.ID = id
    c.JSON(http.StatusOK, d)
}
