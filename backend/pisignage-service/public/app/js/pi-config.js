angular.module('piConfig', [])
    .constant('piUrls', (function() {
        var base,protocol;
        //IE fix !
        if (!window.location.origin) {
            window.location.origin =
                window.location.protocol + "//" + window.location.hostname +
                (window.location.port ? ':' + window.location.port: '');
        }
        protocol = window.location.protocol.toLowerCase();
        if (protocol.indexOf("http") != -1 )
            base = window.location.origin+'/';
        else
            base = 'http://localhost/';
        console.log("api base: ",base);
        return {
            base:            base,
            files:           base + 'api/files/' ,
            filespostupload: base + 'api/postupload',
            playlistfiles:   base + 'api/playlistfiles',
            calendars:       base + 'api/calendars/',
            links:           base + 'api/links/',
            licenses:        base + 'api/licensefiles/',
            settings:        base + 'api/settings/',
            serverConfig:    base + 'api/serverconfig/',

            playlists:       base + 'api/playlists/',

            groups:          base + 'api/groups/',

            players:         base + 'api/players/',
            labels:          base + 'api/labels/' ,

            pishell:         base + 'api/pishell/',
            snapshot:        base + 'api/snapshot/',
            pitv:            base + 'api/pitv/',
            swupdate:        base + 'api/swupdate/'

        }
    })())

    .constant('piConstants', (function() {
        return {
            videoRegex:     /(mp4|mov|m4v|avi|webm|wmv|flv|mkv|mpg|mpeg|3gp)$/i,
            audioRegex:     /(mp3|m4a|mp4a|aac)$/i,
            imageRegex:     /(jpg|jpeg|png|gif|bmp)$/i,
            noticeRegex:    /\.html$/i,
            zipfileRegex:   /(.zip|.gz|.bz2)$/i,
            repofileRegex:          /\.repo$/i,
            liveStreamRegex :       /\.tv$/i,
            omxStreamRegex :        /\.stream$/i,
            linkURL:                /\.link$/i,
            CORSLink:               /\.weblink$/i,
            mediaRss:               /\.mrss$/i,
            nestedPlaylist:         /^__/i,
            groupNameRegEx:         /[&\/\\#,+()$~%'":*?<>{}\^]/g,
            pdffileRegex:           /\.pdf$/i,
            txtFileRegex:           /\.txt$/i,
            radioFileRegex:         /\.radio$/i
        }
    })())

    .constant('layoutOtherZones', (function() {
        return {
            '1'         : [],
            '2a'        : ["side"],
            '2b'        : ["side"],
            '2c'        : ["side"],
            '2d'        : ["side"],
            '3a'        : ["side","bottom"],
            '3b'        : ["side","bottom"],
            '3c'        : ["side","bottom"],
            '3d'        : ["side","bottom"],
            '4a'        : ["side","bottom"],
            '4b'        : ["side","bottom"],
            '4c'        : ["side","bottom"],
            '4d'        : ["side","bottom"],
            '2ap'       : [],
            '2bp'       : ["bottom"],
            '2ap270'    : [],
            '2bp270'    : ["bottom"],
            'custom'    : ["side","bottom","zone4","zone5","zone6"],
            'customp'   : ["side","bottom","zone4","zone5","zone6"],
            'customp270': ["side","bottom","zone4","zone5","zone6"]
        }
    })())

    .constant('weeks',(function(){ // all weeks for playlist time setting
        return [
            'All Days',  'Sunday',
            'Monday',    'Tuesday',
            'Wednesday', 'Thursday',
            'Friday',    'Saturday'
        ]
    })())

    .constant('days',(function(){ // all days in month for playlist time setting
        return [
            'All Dates',
            '1', '2', '3',
            '4', '5', '6',
            '7', '8', '9',
            '10', '11', '12',
            '13', '14', '15',
            '16', '17', '18',
            '19', '20', '21',
            '22', '23', '24',
            '25', '26', '27',
            '28', '29', '30',
            '31'
        ]

    })())

    .constant('weeksObject',(function(){ // all weeks for playlist time setting
        return [
            //{id: 0,label: 'All Days'},
            {id: 1,label: 'Sunday'},
            {id: 2,label: 'Monday'},
            {id: 3,label: 'Tuesday'},
            {id: 4,label: 'Wednesday'},
            {id: 5,label: 'Thursday'},
            {id: 6,label: 'Friday'},
            {id: 7,label: 'Saturday'}
        ]
    })())

    .constant('daysObject',(function(){ // all days in month for playlist time setting
        return [
            //{id: 0,label: 'All Dates'},
            {id: 1,label: '1'}, {id: 2,label: '2'}, {id: 3,label: '3'},
            {id: 4,label: '4'}, {id: 5,label: '5'}, {id: 6,label: '6'},
            {id: 7,label: '7'}, {id: 8,label: '8'}, {id: 9,label: '9'},
            {id: 10,label: '10'}, {id: 11,label: '11'}, {id: 12,label: '12'},
            {id: 13,label: '13'}, {id: 14,label: '14'},{id: 15,label:  '15'},
            {id: 16,label: '16'}, {id: 17,label: '17'},{id: 18,label:  '18'},
            {id: 19,label: '19'}, {id: 20,label: '20'}, {id: 21,label: '21'},
            {id: 22,label: '22'}, {id: 23,label: '23'}, {id: 24,label: '24'},
            {id: 25,label: '25'}, {id: 26,label: '26'}, {id: 27,label: '27'},
            {id: 28,label: '28'}, {id: 29,label: '29'}, {id: 30,label: '30'},
            {id: 31,label: '31'}
        ]

    })())

    .constant('TZNames', (function() {
        return ['Africa/Abidjan',
            'Africa/Accra',
            'Africa/Addis_Ababa',
            'Africa/Algiers',
            'Africa/Asmara',
            'Africa/Asmera',
            'Africa/Bamako',
            'Africa/Bangui',
            'Africa/Banjul',
            'Africa/Bissau',
            'Africa/Blantyre',
            'Africa/Brazzaville',
            'Africa/Bujumbura',
            'Africa/Cairo',
            'Africa/Casablanca',
            'Africa/Ceuta',
            'Africa/Conakry',
            'Africa/Dakar',
            'Africa/Dar_es_Salaam',
            'Africa/Djibouti',
            'Africa/Douala',
            'Africa/El_Aaiun',
            'Africa/Freetown',
            'Africa/Gaborone',
            'Africa/Harare',
            'Africa/Johannesburg',
            'Africa/Juba',
            'Africa/Kampala',
            'Africa/Khartoum',
            'Africa/Kigali',
            'Africa/Kinshasa',
            'Africa/Lagos',
            'Africa/Libreville',
            'Africa/Lome',
            'Africa/Luanda',
            'Africa/Lubumbashi',
            'Africa/Lusaka',
            'Africa/Malabo',
            'Africa/Maputo',
            'Africa/Maseru',
            'Africa/Mbabane',
            'Africa/Mogadishu',
            'Africa/Monrovia',
            'Africa/Nairobi',
            'Africa/Ndjamena',
            'Africa/Niamey',
            'Africa/Nouakchott',
            'Africa/Ouagadougou',
            'Africa/Porto-Novo',
            'Africa/Sao_Tome',
            'Africa/Timbuktu',
            'Africa/Tripoli',
            'Africa/Tunis',
            'Africa/Windhoek',
            'AKST9AKDT',
            'America/Adak',
            'America/Anchorage',
            'America/Anguilla',
            'America/Antigua',
            'America/Araguaina',
            'America/Argentina/Buenos_Aires',
            'America/Argentina/Catamarca',
            'America/Argentina/ComodRivadavia',
            'America/Argentina/Cordoba',
            'America/Argentina/Jujuy',
            'America/Argentina/La_Rioja',
            'America/Argentina/Mendoza',
            'America/Argentina/Rio_Gallegos',
            'America/Argentina/Salta',
            'America/Argentina/San_Juan',
            'America/Argentina/San_Luis',
            'America/Argentina/Tucuman',
            'America/Argentina/Ushuaia',
            'America/Aruba',
            'America/Asuncion',
            'America/Atikokan',
            'America/Atka',
            'America/Bahia',
            'America/Bahia_Banderas',
            'America/Barbados',
            'America/Belem',
            'America/Belize',
            'America/Blanc-Sablon',
            'America/Boa_Vista',
            'America/Bogota',
            'America/Boise',
            'America/Buenos_Aires',
            'America/Cambridge_Bay',
            'America/Campo_Grande',
            'America/Cancun',
            'America/Caracas',
            'America/Catamarca',
            'America/Cayenne',
            'America/Cayman',
            'America/Chicago',
            'America/Chihuahua',
            'America/Coral_Harbour',
            'America/Cordoba',
            'America/Costa_Rica',
            'America/Creston',
            'America/Cuiaba',
            'America/Curacao',
            'America/Danmarkshavn',
            'America/Dawson',
            'America/Dawson_Creek',
            'America/Denver',
            'America/Detroit',
            'America/Dominica',
            'America/Edmonton',
            'America/Eirunepe',
            'America/El_Salvador',
            'America/Ensenada',
            'America/Fort_Wayne',
            'America/Fortaleza',
            'America/Glace_Bay',
            'America/Godthab',
            'America/Goose_Bay',
            'America/Grand_Turk',
            'America/Grenada',
            'America/Guadeloupe',
            'America/Guatemala',
            'America/Guayaquil',
            'America/Guyana',
            'America/Halifax',
            'America/Havana',
            'America/Hermosillo',
            'America/Indiana/Indianapolis',
            'America/Indiana/Knox',
            'America/Indiana/Marengo',
            'America/Indiana/Petersburg',
            'America/Indiana/Tell_City',
            'America/Indiana/Vevay',
            'America/Indiana/Vincennes',
            'America/Indiana/Winamac',
            'America/Indianapolis',
            'America/Inuvik',
            'America/Iqaluit',
            'America/Jamaica',
            'America/Jujuy',
            'America/Juneau',
            'America/Kentucky/Louisville',
            'America/Kentucky/Monticello',
            'America/Knox_IN',
            'America/Kralendijk',
            'America/La_Paz',
            'America/Lima',
            'America/Los_Angeles',
            'America/Louisville',
            'America/Lower_Princes',
            'America/Maceio',
            'America/Managua',
            'America/Manaus',
            'America/Marigot',
            'America/Martinique',
            'America/Matamoros',
            'America/Mazatlan',
            'America/Mendoza',
            'America/Menominee',
            'America/Merida',
            'America/Metlakatla',
            'America/Mexico_City',
            'America/Miquelon',
            'America/Moncton',
            'America/Monterrey',
            'America/Montevideo',
            'America/Montreal',
            'America/Montserrat',
            'America/Nassau',
            'America/New_York',
            'America/Nipigon',
            'America/Nome',
            'America/Noronha',
            'America/North_Dakota/Beulah',
            'America/North_Dakota/Center',
            'America/North_Dakota/New_Salem',
            'America/Ojinaga',
            'America/Panama',
            'America/Pangnirtung',
            'America/Paramaribo',
            'America/Phoenix',
            'America/Port_of_Spain',
            'America/Port-au-Prince',
            'America/Porto_Acre',
            'America/Porto_Velho',
            'America/Puerto_Rico',
            'America/Rainy_River',
            'America/Rankin_Inlet',
            'America/Recife',
            'America/Regina',
            'America/Resolute',
            'America/Rio_Branco',
            'America/Rosario',
            'America/Santa_Isabel',
            'America/Santarem',
            'America/Santiago',
            'America/Santo_Domingo',
            'America/Sao_Paulo',
            'America/Scoresbysund',
            'America/Shiprock',
            'America/Sitka',
            'America/St_Barthelemy',
            'America/St_Johns',
            'America/St_Kitts',
            'America/St_Lucia',
            'America/St_Thomas',
            'America/St_Vincent',
            'America/Swift_Current',
            'America/Tegucigalpa',
            'America/Thule',
            'America/Thunder_Bay',
            'America/Tijuana',
            'America/Toronto',
            'America/Tortola',
            'America/Vancouver',
            'America/Virgin',
            'America/Whitehorse',
            'America/Winnipeg',
            'America/Yakutat',
            'America/Yellowknife',
            'Antarctica/Casey',
            'Antarctica/Davis',
            'Antarctica/DumontDUrville',
            'Antarctica/Macquarie',
            'Antarctica/Mawson',
            'Antarctica/McMurdo',
            'Antarctica/Palmer',
            'Antarctica/Rothera',
            'Antarctica/South_Pole',
            'Antarctica/Syowa',
            'Antarctica/Vostok',
            'Arctic/Longyearbyen',
            'Asia/Aden',
            'Asia/Almaty',
            'Asia/Amman',
            'Asia/Anadyr',
            'Asia/Aqtau',
            'Asia/Aqtobe',
            'Asia/Ashgabat',
            'Asia/Ashkhabad',
            'Asia/Baghdad',
            'Asia/Bahrain',
            'Asia/Baku',
            'Asia/Bangkok',
            'Asia/Beirut',
            'Asia/Bishkek',
            'Asia/Brunei',
            'Asia/Calcutta',
            'Asia/Choibalsan',
            'Asia/Chongqing',
            'Asia/Chungking',
            'Asia/Colombo',
            'Asia/Dacca',
            'Asia/Damascus',
            'Asia/Dhaka',
            'Asia/Dili',
            'Asia/Dubai',
            'Asia/Dushanbe',
            'Asia/Gaza',
            'Asia/Harbin',
            'Asia/Hebron',
            'Asia/Ho_Chi_Minh',
            'Asia/Hong_Kong',
            'Asia/Hovd',
            'Asia/Irkutsk',
            'Asia/Istanbul',
            'Asia/Jakarta',
            'Asia/Jayapura',
            'Asia/Jerusalem',
            'Asia/Kabul',
            'Asia/Kamchatka',
            'Asia/Karachi',
            'Asia/Kashgar',
            'Asia/Kathmandu',
            'Asia/Katmandu',
            'Asia/Kolkata',
            'Asia/Krasnoyarsk',
            'Asia/Kuala_Lumpur',
            'Asia/Kuching',
            'Asia/Kuwait',
            'Asia/Macao',
            'Asia/Macau',
            'Asia/Magadan',
            'Asia/Makassar',
            'Asia/Manila',
            'Asia/Muscat',
            'Asia/Nicosia',
            'Asia/Novokuznetsk',
            'Asia/Novosibirsk',
            'Asia/Omsk',
            'Asia/Oral',
            'Asia/Phnom_Penh',
            'Asia/Pontianak',
            'Asia/Pyongyang',
            'Asia/Qatar',
            'Asia/Qyzylorda',
            'Asia/Rangoon',
            'Asia/Riyadh',
            'Asia/Saigon',
            'Asia/Sakhalin',
            'Asia/Samarkand',
            'Asia/Seoul',
            'Asia/Shanghai',
            'Asia/Singapore',
            'Asia/Taipei',
            'Asia/Tashkent',
            'Asia/Tbilisi',
            'Asia/Tehran',
            'Asia/Tel_Aviv',
            'Asia/Thimbu',
            'Asia/Thimphu',
            'Asia/Tokyo',
            'Asia/Ujung_Pandang',
            'Asia/Ulaanbaatar',
            'Asia/Ulan_Bator',
            'Asia/Urumqi',
            'Asia/Vientiane',
            'Asia/Vladivostok',
            'Asia/Yakutsk',
            'Asia/Yekaterinburg',
            'Asia/Yerevan',
            'Atlantic/Azores',
            'Atlantic/Bermuda',
            'Atlantic/Canary',
            'Atlantic/Cape_Verde',
            'Atlantic/Faeroe',
            'Atlantic/Faroe',
            'Atlantic/Jan_Mayen',
            'Atlantic/Madeira',
            'Atlantic/Reykjavik',
            'Atlantic/South_Georgia',
            'Atlantic/St_Helena',
            'Atlantic/Stanley',
            'Australia/ACT',
            'Australia/Adelaide',
            'Australia/Brisbane',
            'Australia/Broken_Hill',
            'Australia/Canberra',
            'Australia/Currie',
            'Australia/Darwin',
            'Australia/Eucla',
            'Australia/Hobart',
            'Australia/LHI',
            'Australia/Lindeman',
            'Australia/Lord_Howe',
            'Australia/Melbourne',
            'Australia/North',
            'Australia/NSW',
            'Australia/Perth',
            'Australia/Queensland',
            'Australia/South',
            'Australia/Sydney',
            'Australia/Tasmania',
            'Australia/Victoria',
            'Australia/West',
            'Australia/Yancowinna',
            'Brazil/Acre',
            'Brazil/DeNoronha',
            'Brazil/East',
            'Brazil/West',
            'Canada/Atlantic',
            'Canada/Central',
            'Canada/Eastern',
            'Canada/East-Saskatchewan',
            'Canada/Mountain',
            'Canada/Newfoundland',
            'Canada/Pacific',
            'Canada/Saskatchewan',
            'Canada/Yukon',
            'Europe/Amsterdam',
            'Europe/Andorra',
            'Europe/Athens',
            'Europe/Belfast',
            'Europe/Belgrade',
            'Europe/Berlin',
            'Europe/Bratislava',
            'Europe/Brussels',
            'Europe/Bucharest',
            'Europe/Budapest',
            'Europe/Chisinau',
            'Europe/Copenhagen',
            'Europe/Dublin',
            'Europe/Gibraltar',
            'Europe/Guernsey',
            'Europe/Helsinki',
            'Europe/Isle_of_Man',
            'Europe/Istanbul',
            'Europe/Jersey',
            'Europe/Kaliningrad',
            'Europe/Kiev',
            'Europe/Lisbon',
            'Europe/Ljubljana',
            'Europe/London',
            'Europe/Luxembourg',
            'Europe/Madrid',
            'Europe/Malta',
            'Europe/Mariehamn',
            'Europe/Minsk',
            'Europe/Monaco',
            'Europe/Moscow',
            'Europe/Nicosia',
            'Europe/Oslo',
            'Europe/Paris',
            'Europe/Podgorica',
            'Europe/Prague',
            'Europe/Riga',
            'Europe/Rome',
            'Europe/Samara',
            'Europe/San_Marino',
            'Europe/Sarajevo',
            'Europe/Simferopol',
            'Europe/Skopje',
            'Europe/Sofia',
            'Europe/Stockholm',
            'Europe/Tallinn',
            'Europe/Tirane',
            'Europe/Tiraspol',
            'Europe/Uzhgorod',
            'Europe/Vaduz',
            'Europe/Vatican',
            'Europe/Vienna',
            'Europe/Vilnius',
            'Europe/Volgograd',
            'Europe/Warsaw',
            'Europe/Zagreb',
            'Europe/Zaporozhye',
            'Europe/Zurich',
            'Iceland',
            'Indian/Antananarivo',
            'Indian/Chagos',
            'Indian/Christmas',
            'Indian/Cocos',
            'Indian/Comoro',
            'Indian/Kerguelen',
            'Indian/Mahe',
            'Indian/Maldives',
            'Indian/Mauritius',
            'Indian/Mayotte',
            'Indian/Reunion',
            'Iran',
            'Israel',
            'Jamaica',
            'Japan',
            'Kwajalein',
            'Libya',
            'Mexico/BajaNorte',
            'Mexico/BajaSur',
            'Mexico/General',
            'MST7MDT',
            'Navajo',
            'Pacific/Apia',
            'Pacific/Auckland',
            'Pacific/Chatham',
            'Pacific/Chuuk',
            'Pacific/Easter',
            'Pacific/Efate',
            'Pacific/Enderbury',
            'Pacific/Fakaofo',
            'Pacific/Fiji',
            'Pacific/Funafuti',
            'Pacific/Galapagos',
            'Pacific/Gambier',
            'Pacific/Guadalcanal',
            'Pacific/Guam',
            'Pacific/Honolulu',
            'Pacific/Johnston',
            'Pacific/Kiritimati',
            'Pacific/Kosrae',
            'Pacific/Kwajalein',
            'Pacific/Majuro',
            'Pacific/Marquesas',
            'Pacific/Midway',
            'Pacific/Nauru',
            'Pacific/Niue',
            'Pacific/Norfolk',
            'Pacific/Noumea',
            'Pacific/Pago_Pago',
            'Pacific/Palau',
            'Pacific/Pitcairn',
            'Pacific/Pohnpei',
            'Pacific/Ponape',
            'Pacific/Port_Moresby',
            'Pacific/Rarotonga',
            'Pacific/Saipan',
            'Pacific/Samoa',
            'Pacific/Tahiti',
            'Pacific/Tarawa',
            'Pacific/Tongatapu',
            'Pacific/Truk',
            'Pacific/Wake',
            'Pacific/Wallis',
            'Pacific/Yap',
            'Poland',
            'Portugal',
            'Singapore',
            'Turkey',
            'Universal',
            'US/Alaska',
            'US/Aleutian',
            'US/Arizona',
            'US/Central',
            'US/Eastern',
            'US/East-Indiana',
            'US/Hawaii',
            'US/Indiana-Starke',
            'US/Michigan',
            'US/Mountain',
            'US/Pacific',
            'US/Pacific-New',
            'US/Samoa',
            'UTC',
            'EST',
            'GMT'
        ]
    })());
