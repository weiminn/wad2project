<template>
  <b-container fluid class="p-0">
    <b-row class="justify-content-md-center"  no-gutters>
      <b-col md="4" lg="4" class="mb-4" no-gutters >

      
        <b-dropdown v-if="filteredPastFacilitiesByMonth.length == 0" id="FavouriteBookings" text="Book Again" class="mb-2 w-75"  menu-class="w-100" >
          <b-dropdown-text >You have not made any bookings in the past month. Make a booking now to view it here in the future :)</b-dropdown-text>
        </b-dropdown>
        <b-dropdown v-else-if="facilitiesAvailableForRebooking.length == 0 " id="FavouriteBookings" text="Book Again" class="mb-2 w-75"  menu-class="w-100" >
          <b-dropdown-text >All your past facilities booked are currently unavailable, try changing to another time slot</b-dropdown-text>
        </b-dropdown>
         <b-dropdown v-else id="FavouriteBookings" text="Book Again" class="mb-2 w-75"  menu-class="w-100" >
          <b-dropdown-item @click="selectedFacilitiesFromPastBooking(facility)" v-for='facility in facilitiesAvailableForRebooking' :key="facility">{{facility}}</b-dropdown-item>
        </b-dropdown>

        <p class="text-left mb-1"> Step1: Select When?</p> 
        <b-form-datepicker
                @context="validateFomTimeEntered" 
                value-as-date id="datepicker" 
                placeholder="Select Date" 
                v-model="date" 
                class="mb-2"></b-form-datepicker>

        <vue-timepicker 
                @close="validateFomTimeEntered" 
                auto-scroll 
                class="mr-2"
                input-width="100px" 
                id="fromTime" 
                format="HH:mm" 
                v-model="fromTime" 
                :minute-interval="30" 
                :hour-range="[[8, 21]]"
                hide-disabled-hours
                hide-clear-button ></vue-timepicker>

        <vue-timepicker 
                @close="validateToTimeEntered" 
                auto-scroll 
                input-width="100px" 
                id="toTime" 
                format="HH:mm" 
                v-model="toTime" 
                :minute-interval="30" 
                :hour-range="[[8, 22]]"
                hide-disabled-hours
                hide-clear-button ></vue-timepicker><br>

        <p class="text-left mb-1 mt-2">Step2: Select Where?</p>
      
        <div class="smuMap p-2 rounded w-100">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 5064.000000 5430.000000">
            <g transform="translate(0.000000,5430.000000) scale(0.100000,-0.100000)">
            <!--  @click="selectSchool($event)" -->
            <path 

            id="Admin"
		        name="Admin"
            d="M45025 54280 c-17 -18 -16 -193 13 -4095 l31 -4075 24 -33 c13 -17
            95 -157 181 -309 87 -152 163 -279 170 -281 7 -3 228 -1 490 5 262 6 479 8
            481 6 3 -3 14 -1417 25 -3142 13 -2028 24 -3145 31 -3157 21 -40 100 -33 114
            10 8 26 -177 26 1852 1 887 -11 1619 -17 1627 -14 18 7 40 59 31 74 -3 6 5 24
            19 41 25 29 26 36 26 157 0 113 141 9967 154 10761 l6 314 154 111 c86 61 158
            117 160 124 3 6 11 784 17 1728 l11 1716 -40 40 -40 40 -2717 -10 c-1748 -7
            -2724 -8 -2736 -2 -29 16 -64 12 -84 -10z m2235 -5660 l0 -611 -72 3 c-72 3
            -72 3 -80 35 l-9 33 -39 -29 c-51 -36 -125 -55 -215 -54 -155 2 -262 80 -317
            230 -18 49 -21 81 -22 198 0 120 3 149 23 204 54 154 156 235 311 248 73 6
            176 -9 222 -33 l28 -15 0 201 0 200 85 0 85 0 0 -610z m1690 490 l0 -80 -85 0
            -85 0 0 80 0 80 85 0 85 0 0 -80z m-2906 41 c5 -7 247 -672 389 -1068 l27 -73
            -93 0 -92 0 -55 155 -55 155 -216 0 -217 0 -40 -112 c-22 -62 -45 -132 -52
            -155 l-13 -43 -84 0 c-45 0 -83 2 -83 4 0 2 90 255 200 563 110 307 202 564
            205 571 5 14 170 18 179 3z m1919 -272 c21 -6 56 -26 77 -45 l39 -35 58 29
            c82 42 157 62 227 62 116 0 181 -35 220 -120 20 -43 21 -64 24 -397 l4 -353
            -86 0 -86 0 0 303 c0 316 -6 371 -39 398 -44 36 -142 32 -248 -8 l-43 -16 0
            -338 0 -339 -85 0 -85 0 0 319 c0 179 -4 331 -10 345 -16 42 -53 59 -129 58
            -47 0 -86 -7 -127 -24 l-59 -23 2 -338 3 -337 -85 0 -85 0 0 403 c0 221 -3
            412 -6 425 -6 22 -5 22 80 22 l86 0 0 -35 0 -36 45 27 c97 56 220 78 308 53z
            m1733 -4 c56 -16 95 -51 121 -110 16 -35 18 -80 21 -392 l4 -353 -85 0 -86 0
            -3 328 c-2 180 -7 335 -12 345 -25 54 -159 66 -281 26 l-70 -24 2 -337 3 -338
            -85 0 -85 0 0 403 c0 221 -3 412 -6 425 -6 22 -5 22 80 22 l86 0 0 -34 0 -35
            58 30 c112 57 239 74 338 44z m-746 -430 l0 -425 -85 0 -85 0 0 425 0 425 85
            0 85 0 0 -425z M46828 48731 c-91 -30 -134 -91 -149 -214 -18 -140 9 -274 66 -331
            62 -62 193 -74 291 -26 l49 25 3 256 2 257 -42 17 c-49 20 -180 29 -220 16z 
            M45916 48858 c-37 -106 -136 -391 -136 -395 0 -2 75 -3 166 -3 129 0 165 3 162 
            13 -3 6 -40 111 -83 232 -43 121 -79 221 -80 223 -2 2 -14 -30 -29 -70z"/>
            <path 
            @click="selectSchool($event)"
            id="SOE_SOSS"
		        name="SOE_SOSS"
            d="M307 37143 c-28 -7 -60 -80 -53 -122 3 -19 -53 -706 -125 -1526 -71
            -819 -128 -1503 -127 -1520 2 -21 11 -34 32 -45 16 -8 38 -23 48 -32 16 -16
            47 -18 344 -18 l327 0 -7 -267 c-3 -148 -9 -1058 -12 -2023 -6 -1652 -6 -1756
            11 -1770 11 -10 51 -15 128 -18 819 -29 2649 -100 2652 -103 2 -3 -14 -364
            -35 -804 -22 -440 -40 -814 -40 -832 0 -18 8 -40 18 -50 10 -10 23 -30 29 -45
            9 -19 21 -28 45 -32 18 -3 1894 -61 4168 -130 3599 -108 4138 -122 4158 -110
            15 10 22 24 22 44 0 23 5 30 19 30 10 0 24 7 32 16 10 12 67 1098 243 4576
            l230 4561 -22 17 c-12 10 -22 25 -22 33 0 7 -9 22 -19 31 -18 16 -383 20
            -5987 59 l-5967 41 -23 23 c-23 23 -32 25 -67 16z m6233 -4330 l-196 -708 -72
            -3 c-54 -2 -72 0 -72 10 -1 7 86 327 192 711 l193 697 76 0 76 0 -197 -707z
            m790 626 c25 -5 64 -17 88 -26 l42 -16 0 -74 c0 -68 -2 -74 -17 -68 -70 30
            -158 47 -248 48 -109 2 -138 -7 -185 -58 -22 -23 -25 -35 -25 -102 0 -73 1
            -75 36 -107 26 -25 69 -44 165 -76 71 -24 149 -53 174 -65 54 -27 113 -84 135
            -131 42 -89 40 -226 -5 -320 -28 -58 -98 -118 -169 -145 -120 -45 -360 -33
            -480 24 l-46 22 -3 68 c-2 41 1 67 7 67 6 0 46 -12 88 -27 69 -24 94 -27 208
            -27 114 -1 134 2 165 20 58 34 80 76 80 155 0 107 -33 136 -225 199 -131 43
            -187 72 -235 121 -50 52 -74 122 -74 219 1 129 61 225 172 277 82 38 234 48
            352 22z m981 -10 c161 -46 265 -162 316 -350 24 -90 24 -339 0 -427 -54 -198
            -184 -329 -364 -367 -190 -41 -378 9 -492 130 -101 107 -141 233 -141 445 0
            209 40 337 137 441 133 142 333 190 544 128z m959 10 c25 -5 64 -17 88 -26
            l42 -16 0 -74 c0 -68 -2 -74 -17 -68 -70 30 -158 47 -248 48 -109 2 -138 -7
            -185 -58 -22 -23 -25 -35 -25 -102 0 -73 1 -75 36 -107 26 -25 69 -44 165 -76
            71 -24 149 -53 174 -65 54 -27 113 -84 135 -131 42 -89 40 -226 -5 -320 -28
            -58 -98 -118 -169 -145 -120 -45 -360 -33 -480 24 l-46 22 -3 68 c-2 41 1 67
            7 67 6 0 46 -12 88 -27 69 -24 94 -27 208 -27 114 -1 134 2 165 20 58 34 80
            76 80 155 0 107 -33 136 -225 199 -131 43 -187 72 -235 121 -50 52 -74 122
            -74 219 1 129 61 225 172 277 82 38 234 48 352 22z m820 0 c25 -5 64 -17 88
            -26 l42 -16 0 -74 c0 -68 -2 -74 -17 -68 -70 30 -158 47 -248 48 -109 2 -138
            -7 -185 -58 -22 -23 -25 -35 -25 -102 0 -73 1 -75 36 -107 26 -25 69 -44 165
            -76 71 -24 149 -53 174 -65 54 -27 113 -84 135 -131 42 -89 40 -226 -5 -320
            -28 -58 -98 -118 -169 -145 -120 -45 -360 -33 -480 24 l-46 22 -3 68 c-2 41 1
            67 7 67 6 0 46 -12 88 -27 69 -24 94 -27 208 -27 114 -1 134 2 165 20 58 34
            80 76 80 155 0 107 -33 136 -225 199 -131 43 -187 72 -235 121 -50 52 -74 122
            -74 219 1 129 61 225 172 277 82 38 234 48 352 22z m-6150 -10 c25 -5 64 -17
            88 -26 l42 -16 0 -74 c0 -68 -2 -74 -17 -68 -70 30 -158 47 -248 48 -109 2
            -138 -7 -185 -58 -22 -23 -25 -35 -25 -102 0 -73 1 -75 36 -107 26 -25 69 -44
            165 -76 71 -24 149 -53 174 -65 54 -27 113 -84 135 -131 42 -89 40 -226 -5
            -320 -28 -58 -98 -118 -169 -145 -120 -45 -360 -33 -480 24 l-46 22 -3 68 c-2
            41 1 67 7 67 6 0 46 -12 88 -27 69 -24 94 -27 208 -27 114 -1 134 2 165 20 58
            34 80 76 80 155 0 107 -33 136 -225 199 -131 43 -187 72 -235 121 -50 52 -74
            122 -74 219 1 129 61 225 172 277 82 38 234 48 352 22z m981 -10 c161 -46 265
            -162 316 -350 24 -90 24 -339 0 -427 -54 -198 -184 -329 -364 -367 -190 -41
            -378 9 -492 130 -101 107 -141 233 -141 445 0 209 40 337 137 441 133 142 333
            190 544 128z m1207 -66 l3 -73 -260 0 c-176 0 -262 -4 -267 -11 -3 -6 -3 -82
            1 -170 l7 -159 199 0 199 0 0 -70 0 -70 -200 0 -200 0 0 -185 0 -185 263 -2
            262 -3 3 -72 3 -73 -356 0 -355 0 0 570 0 569 83 4 c45 2 201 3 347 3 l265 -1
            3 -72z M8027 33296 c-84 -30 -136 -83 -176 -179 -22 -55 -26 -79 -29 -212
            -4 -167 5 -239 44 -325 48 -108 135 -163 259 -164 94 -1 156 18 211 67 83 73
            124 193 124 367 0 315 -105 461 -329 460 -36 -1 -83 -7 -104 -14z M4637 33286 
            c-84 -30 -136 -83 -176 -179 -22 -55 -26 -79 -29 -212 -4 -167 5 -239 44 -325 
            48 -108 135 -163 259 -164 94 -1 156 18 211 67 83 73 124 193 124 367 0 315 -105 
            461 -329 460 -36 -1 -83 -7 -104 -14z"/>
            <path 
            @click="selectSchool($event)"
            id="SIS"
		        name="SIS"
            d="M17783 37020 c-2670 -7 -2784 -8 -2803 -25 -26 -23 -27 -85 -2 -108
            16 -15 17 -73 8 -1079 -4 -585 -9 -1064 -10 -1065 -1 -2 -79 -14 -172 -27 -94
            -14 -177 -28 -186 -31 -47 -18 -53 16 241 -1473 222 -1127 282 -1418 297
            -1432 11 -10 127 -57 259 -106 132 -48 244 -91 248 -94 7 -6 46 -238 47 -277
            0 -10 -60 -13 -267 -13 -148 0 -273 -4 -279 -8 -6 -4 -18 -20 -26 -37 -39 -77
            -518 -1194 -518 -1208 0 -9 10 -27 23 -41 l22 -25 335 -12 c184 -6 336 -12
            337 -12 1 -1 15 -70 32 -154 120 -584 366 -1062 730 -1421 184 -181 399 -331
            656 -457 243 -119 481 -202 753 -262 117 -26 125 -26 155 -11 18 9 91 24 162
            33 443 54 879 190 1227 381 416 229 782 565 1060 973 254 372 458 822 608
            1338 l20 72 206 -100 c236 -114 208 -109 472 -81 134 15 165 21 180 37 11 12
            198 584 451 1375 238 745 433 1356 434 1356 1 1 91 13 200 28 109 14 206 30
            216 36 20 10 36 54 26 71 -6 9 -7 430 -1 436 1 2 73 -31 159 -72 85 -41 169
            -75 185 -75 39 0 66 32 65 77 -1 34 22 61 453 520 305 325 454 491 454 505 0
            12 -5 35 -10 52 -6 17 -33 547 -60 1178 -27 631 -54 1156 -58 1165 -5 10 -15
            32 -23 48 l-15 30 -1754 1 c-965 0 -3007 -3 -4537 -6z m1817 -3561 c25 -5 64
            -17 88 -26 l42 -16 0 -74 c0 -68 -2 -74 -17 -68 -70 30 -158 47 -248 48 -109
            2 -138 -7 -185 -58 -22 -23 -25 -35 -25 -102 0 -73 1 -75 36 -107 26 -25 69
            -44 165 -76 71 -24 149 -53 174 -65 54 -27 113 -84 135 -131 42 -89 40 -226
            -5 -320 -28 -58 -98 -118 -169 -145 -120 -45 -360 -33 -480 24 l-46 22 -3 68
            c-2 41 1 67 7 67 6 0 46 -12 88 -27 69 -24 94 -27 208 -27 114 -1 134 2 165
            20 58 34 80 76 80 155 0 107 -33 136 -225 199 -131 43 -187 72 -235 121 -50
            52 -74 122 -74 219 1 129 61 225 172 277 82 38 234 48 352 22z m-1230 -10 c25
            -5 64 -17 88 -26 l42 -16 0 -74 c0 -68 -2 -74 -17 -68 -70 30 -158 47 -248 48
            -109 2 -138 -7 -185 -58 -22 -23 -25 -35 -25 -102 0 -73 1 -75 36 -107 26 -25
            69 -44 165 -76 71 -24 149 -53 174 -65 54 -27 113 -84 135 -131 42 -89 40
            -226 -5 -320 -28 -58 -98 -118 -169 -145 -120 -45 -360 -33 -480 24 l-46 22
            -3 68 c-2 41 1 67 7 67 6 0 46 -12 88 -27 69 -24 94 -27 208 -27 114 -1 134 2
            165 20 58 34 80 76 80 155 0 107 -33 136 -225 199 -131 43 -187 72 -235 121
            -50 52 -74 122 -74 219 1 129 61 225 172 277 82 38 234 48 352 22z m540 -570
            l0 -569 -83 0 -84 0 -6 173 c-4 94 -7 351 -7 569 l0 397 83 3 c45 2 85 2 90 0
            4 -2 7 -259 7 -573z"/>
            <!--  @click="selectSchool($event)" -->
            <path 

            id="LKS"
		        name="LKS"
            d="M28430 32429 c-19 -12 -98 -72 -175 -134 -534 -428 -965 -891 -1337
            -1435 -318 -465 -612 -1075 -782 -1621 -107 -346 -203 -753 -211 -889 -2 -36
            -22 -142 -44 -237 -173 -729 -207 -1426 -100 -2063 41 -246 129 -554 227 -797
            56 -138 225 -472 259 -512 5 -7 278 -39 441 -52 213 -16 620 -6 821 21 274 36
            600 116 815 199 l78 30 -6 -42 c-9 -66 -10 -218 -1 -262 10 -54 31 -75 73 -75
            55 0 975 180 1000 196 26 17 31 74 8 97 -12 12 -13 40 -6 169 l8 154 68 65
            c38 35 84 79 103 97 l34 33 676 -96 c372 -52 685 -95 696 -95 15 0 39 -33 95
            -127 l75 -127 955 -418 c524 -230 963 -418 974 -418 42 0 62 31 64 100 2 62
            40 492 44 494 2 2 255 -30 563 -70 308 -40 570 -73 583 -74 13 0 40 17 66 43
            l45 42 280 3200 c258 2937 316 3617 323 3793 3 54 0 66 -17 79 -18 14 -134 15
            -1062 9 -795 -4 -1048 -9 -1065 -18 -13 -7 -64 -38 -114 -70 -97 -62 -151 -81
            -407 -143 -167 -40 -375 -77 -577 -102 -181 -22 -678 -25 -840 -5 -485 60
            -875 177 -1290 388 -164 83 -320 174 -365 213 -17 14 -172 119 -346 233 l-315
            207 -127 21 c-155 24 -144 25 -187 -1z m3050 -3570 c25 -5 64 -17 88 -26 l42
            -16 0 -74 c0 -68 -2 -74 -17 -68 -70 30 -158 47 -248 48 -109 2 -138 -7 -185
            -58 -22 -23 -25 -35 -25 -102 0 -73 1 -75 36 -107 26 -25 69 -44 165 -76 71
            -24 149 -53 174 -65 54 -27 113 -84 135 -131 42 -89 40 -226 -5 -320 -28 -58
            -98 -118 -169 -145 -120 -45 -360 -33 -480 24 l-46 22 -3 68 c-2 41 1 67 7 67
            6 0 46 -12 88 -27 69 -24 94 -27 208 -27 114 -1 134 2 165 20 58 34 80 76 80
            155 0 107 -33 136 -225 199 -131 43 -187 72 -235 121 -50 52 -74 122 -74 219
            1 129 61 225 172 277 82 38 234 48 352 22z m-1251 -761 l1 -388 -90 0 -90 0 0
            570 0 569 83 3 82 3 6 -185 c4 -102 7 -359 8 -572z m641 757 c0 -2 -92 -124
            -205 -270 -113 -146 -205 -270 -205 -275 0 -8 338 -466 433 -587 7 -10 -13
            -13 -94 -13 l-104 0 -218 288 c-121 158 -219 291 -219 295 0 5 98 134 217 288
            l217 279 89 0 c49 0 89 -2 89 -5z m-1461 -692 l1 -313 245 0 245 0 0 -75 0
            -75 -335 0 -335 0 0 570 0 569 83 3 82 3 6 -185 c4 -102 7 -326 8 -497z"/>
            <path
            @click="selectSchool($event)"
            id="LKCSB"
		        name="LKCSB"
            d="M45201 25351 c-12 -12 -21 -26 -21 -31 0 -18 -391 -4035 -393 -4036
            -4 -2 -2893 -334 -2907 -334 -14 0 -18 57 -33 423 -22 520 -27 593 -42 614 -8
            10 -29 17 -61 18 -27 1 -634 -33 -1349 -75 -1091 -64 -1303 -75 -1316 -63 -26
            22 -76 16 -94 -10 -13 -21 -10 -97 36 -788 28 -420 173 -2615 323 -4876 263
            -3982 272 -4114 293 -4134 l21 -21 4728 612 c2601 337 4735 618 4742 623 8 6
            31 10 51 8 25 -1 42 3 53 16 14 16 58 783 339 5891 l322 5874 -20 20 c-20 19
            -113 25 -2274 143 -1240 68 -2267 126 -2284 129 -16 3 -44 8 -62 12 -24 5 -36
            1 -52 -15z m-811 -7792 c25 -5 64 -17 88 -26 l42 -16 0 -73 c0 -41 -2 -74 -3
            -74 -2 0 -29 9 -60 19 -31 11 -93 25 -136 31 -209 31 -360 -56 -406 -235 -18
            -71 -21 -298 -4 -377 26 -120 83 -199 172 -239 46 -21 67 -24 172 -24 105 1
            130 4 196 28 41 15 79 27 82 27 4 0 7 -31 7 -69 l0 -69 -51 -22 c-128 -55
            -339 -64 -464 -20 -139 48 -234 147 -281 293 -22 69 -28 106 -32 228 -7 220
            19 334 102 446 50 68 127 124 211 154 99 35 253 43 365 18z m830 -20 l65 -24
            3 -74 c3 -67 1 -73 -15 -68 -119 39 -168 48 -253 50 -111 2 -160 -16 -197 -72
            -44 -66 -24 -174 40 -216 13 -8 84 -35 157 -60 72 -24 151 -55 174 -69 64 -37
            114 -94 133 -151 23 -67 22 -184 -1 -254 -26 -75 -101 -151 -181 -181 -123
            -47 -363 -35 -484 23 l-46 22 -3 68 c-2 41 1 67 7 67 6 0 46 -12 88 -26 91
            -31 261 -44 329 -25 86 23 126 79 126 174 0 99 -40 135 -215 193 -184 61 -251
            104 -291 188 -41 87 -40 220 3 304 30 59 104 119 175 142 89 29 293 23 386
            -11z m-1540 15 c0 -3 -90 -122 -200 -264 -110 -142 -203 -265 -206 -274 -4
            -11 265 -384 429 -593 7 -10 -13 -13 -94 -13 l-104 0 -213 280 c-117 154 -215
            286 -218 294 -4 10 73 117 212 296 l218 280 88 0 c48 0 88 -3 88 -6z m2355
            -15 c63 -12 147 -59 175 -99 46 -64 63 -179 39 -263 -14 -51 -73 -115 -131
            -142 l-47 -22 52 -16 c132 -42 196 -144 185 -292 -9 -107 -68 -199 -158 -245
            -84 -43 -141 -50 -397 -50 l-243 0 0 570 0 570 168 2 c193 4 287 0 357 -13z
            m-3815 -484 l0 -495 245 0 245 0 0 -75 0 -75 -335 0 -335 0 0 570 0 570 90 0
            90 0 0 -495z m820 -75 l0 -570 -90 0 -90 0 0 570 0 570 90 0 90 0 0 -570z
            M45690 17234 l0 -177 128 7 c195 10 253 48 260 169 4 82 -17 124 -78
            155 -39 19 -59 22 -177 22 l-133 0 0 -176z M45768 16932 l-78 -3 0 -189 0 
            -190 128 0 c157 0 217 15 261 65 35 40 45 83 39 161 -11 127 -101 167 -350 
            156z"/>
            <path 
            @click="selectSchool($event)"
            id="SOA"
		        name="SOA"
            d="M25700 21324 c-658 -34 -1223 -180 -1843 -473 -70 -33 -130 -67 -133
            -76 -3 -8 -15 -15 -25 -15 -10 0 -25 -10 -33 -22 -17 -28 -208 -1424 -199
            -1459 12 -44 227 -395 416 -679 278 -418 588 -823 914 -1197 175 -201 703
            -732 893 -897 796 -696 1655 -1226 2610 -1611 200 -80 568 -214 653 -237 33
            -8 252 -4 959 18 882 28 918 30 937 49 18 18 23 66 56 495 20 261 40 484 45
            495 6 17 48 29 284 79 152 33 278 58 280 55 4 -4 56 -1661 56 -1766 0 -46 4
            -56 36 -89 31 -33 41 -38 77 -37 23 1 688 50 1477 109 1064 79 1441 111 1458
            121 22 13 23 18 17 96 -4 45 -89 1469 -189 3165 l-183 3083 -29 31 -29 30
            -1348 -5 c-1241 -4 -1350 -6 -1367 -22 -12 -11 -20 -13 -25 -6 -7 13 -54 14
            -72 3 -24 -15 -31 -63 -38 -286 l-8 -228 -26 5 c-14 3 -86 13 -160 23 l-133
            18 5 36 c3 19 20 137 38 262 l34 228 -21 20 c-17 18 -153 41 -1029 175 -555
            85 -1026 155 -1046 155 -20 0 -42 -7 -49 -15 -7 -8 -27 -15 -45 -15 -18 0 -39
            -8 -47 -17 -9 -10 -37 -108 -64 -218 -26 -110 -51 -204 -55 -209 -4 -4 -144
            33 -312 83 -293 88 -359 102 -372 81 -3 -5 -19 -7 -35 -3 -16 3 -41 3 -54 -1
            -32 -8 -36 -22 -82 -281 -19 -109 -37 -201 -39 -203 -8 -8 -365 120 -365 131
            0 5 32 147 71 314 l71 304 -27 40 c-36 51 -36 51 -140 87 -278 98 -628 185
            -915 227 -247 37 -645 60 -850 49z m2450 -2935 c25 -5 64 -17 88 -26 l42 -16
            0 -74 c0 -68 -2 -74 -17 -68 -70 30 -158 47 -248 48 -109 2 -138 -7 -185 -58
            -22 -23 -25 -35 -25 -102 0 -73 1 -75 36 -107 26 -25 69 -44 165 -76 71 -24
            149 -53 174 -65 54 -27 113 -84 135 -131 42 -89 40 -226 -5 -320 -28 -58 -98
            -118 -169 -145 -120 -45 -360 -33 -480 24 l-46 22 -3 68 c-2 41 1 67 7 67 6 0
            46 -12 88 -27 69 -24 94 -27 208 -27 114 -1 134 2 165 20 58 34 80 76 80 155
            0 107 -33 136 -225 199 -131 43 -187 72 -235 121 -50 52 -74 122 -74 219 1
            129 61 225 172 277 82 38 234 48 352 22z m981 -10 c161 -46 265 -162 316 -350
            24 -90 24 -339 0 -427 -54 -198 -184 -329 -364 -367 -190 -41 -378 9 -492 130
            -101 107 -141 233 -141 445 0 209 40 337 137 441 133 142 333 190 544 128z
            m983 12 c5 -7 247 -672 389 -1068 l27 -73 -93 0 -92 0 -55 155 -55 155 -216 0
            -217 0 -40 -112 c-22 -62 -45 -132 -52 -155 l-13 -43 -84 0 c-45 0 -83 2 -83
            4 0 2 90 255 200 563 110 307 202 564 205 571 5 14 170 18 179 3z M28847 18246 
            c-84 -30 -136 -83 -176 -179 -22 -55 -26 -79 -29 -212
            -4 -167 5 -239 44 -325 48 -108 135 -163 259 -164 94 -1 156 18 211 67 83 73
            124 193 124 367 0 315 -105 461 -329 460 -36 -1 -83 -7 -104 -14z M29986 18098 
            c-37 -106 -136 -391 -136 -395 0 -2 75 -3 166 -3 129 0 165 3 162 13 -3 6 -40 
            111 -83 232 -43 121 -79 221 -80 223 -2 2 -14 -30 -29 -70z"/>
            <!--  @click="selectSchool($event)" -->
            <path 
           
            id="Connexion"
		        name="Connexion"
            d="M23196 18687 c-16 -12 -89 -500 -567 -3763 -302 -2062 -549 -3765
            -549 -3785 0 -20 6 -41 13 -47 6 -6 57 -13 112 -16 55 -3 2472 -8 5371 -12
            4909 -5 5272 -5 5287 11 10 9 17 30 17 47 0 16 -45 276 -100 576 -77 419 -104
            551 -118 565 -16 16 -68 20 -453 42 -239 14 -450 26 -469 27 l-34 3 -62 423
            c-40 274 -66 429 -75 437 -8 8 -612 216 -1344 464 -1451 490 -1441 487 -1644
            566 -2041 793 -3751 2210 -5146 4264 l-140 206 -40 3 c-23 2 -48 -3 -59 -11z
            m2035 -5198 c232 -67 351 -284 336 -614 -9 -191 -56 -314 -160 -412 -121 -114
            -295 -157 -480 -118 -186 39 -319 179 -362 381 -19 89 -19 298 0 386 28 132
            103 251 202 319 118 81 305 105 464 58z m-921 0 c25 -5 64 -17 88 -26 l42 -16
            0 -73 c0 -41 -2 -74 -3 -74 -2 0 -29 9 -60 19 -31 11 -93 25 -136 31 -209 31
            -360 -56 -406 -235 -18 -71 -21 -298 -4 -377 26 -120 83 -199 172 -239 46 -21
            67 -24 172 -24 105 1 130 4 196 28 41 15 79 27 82 27 4 0 7 -31 7 -69 l0 -69
            -51 -22 c-128 -55 -339 -64 -464 -20 -139 48 -234 147 -281 293 -22 69 -28
            106 -32 228 -7 220 19 334 102 446 50 68 127 124 211 154 99 35 253 43 365 18z
            m2298 -567 l2 -573 -91 3 -92 3 -261 447 -261 446 -3 -449 -2 -449 -80 0 -80
            0 0 570 0 570 103 0 102 0 250 -424 250 -424 3 429 2 430 78 -3 77 -3 3 -573z
            m1090 0 l2 -573 -91 3 -92 3 -261 447 -261 446 -3 -449 -2 -449 -80 0 -80 0 0
            570 0 570 103 0 102 0 250 -424 250 -424 3 429 2 430 78 -3 77 -3 3 -573z
            m1062 571 c0 -3 -74 -131 -165 -283 l-166 -277 172 -279 c94 -153 173 -285
            176 -291 4 -10 -18 -13 -90 -13 l-95 0 -123 198 c-67 108 -132 211 -144 229
            l-21 31 -139 -229 -140 -229 -92 0 -92 0 156 248 c86 136 168 267 183 291 l28
            44 -51 81 c-27 45 -106 170 -173 279 l-123 197 98 0 99 0 133 -215 c74 -118
            136 -215 139 -215 3 0 53 82 110 183 57 100 114 199 127 220 l23 37 85 0 c47
            0 85 -3 85 -7z M24933 13349 c-66 -25 -133 -98 -164 -177 -31 -77 -39 -331 -15 -435
            43 -183 134 -261 306 -262 105 0 158 23 225 97 61 68 85 147 92 298 15 337
            -92 501 -326 499 -41 0 -86 -8 -118 -20z"/>   
            <!--  @click="selectSchool($event)" -->
            <path 
           
            id="SOL"
		        name="SOL"
            d="M26820 8663 l-8135 -334 -54 -27 -55 -27 -688 -2080 c-378 -1144
            -688 -2095 -688 -2112 0 -36 34 -67 67 -61 13 2 338 -274 1018 -864 l1000
            -867 23 -120 c117 -625 443 -1175 909 -1533 145 -112 168 -126 428 -263 339
            -180 708 -297 1105 -350 64 -9 229 -19 370 -22 l255 -5 120 37 c659 202 1126
            543 1354 989 34 66 41 75 45 55 3 -13 26 -175 52 -359 25 -184 51 -344 58
            -355 9 -14 9 -28 2 -47 -15 -41 14 -78 62 -78 20 0 901 140 1957 311 l1920
            311 101 -32 100 -33 78 -94 c42 -52 84 -97 92 -100 17 -6 1317 161 1376 177
            27 8 40 18 44 35 10 40 -3 74 -31 81 -14 3 -25 14 -25 23 -1 9 -126 1047 -279
            2306 -153 1260 -276 2293 -272 2296 3 3 1435 209 3181 458 1746 249 3185 456
            3198 461 27 12 41 46 32 79 -4 17 -1 30 12 43 10 10 18 30 18 46 0 15 -88 545
            -196 1177 l-196 1150 -31 33 c-30 31 -33 32 -111 31 -45 -1 -3742 -152 -8216
            -336z m-2699 -3314 c232 -67 351 -284 336 -614 -9 -191 -56 -314 -160 -412
            -121 -114 -295 -157 -480 -118 -186 39 -319 179 -362 381 -19 89 -19 298 0
            386 28 132 103 251 202 319 118 81 305 105 464 58z m-901 -10 l65 -24 3 -74
            c3 -67 1 -73 -15 -68 -119 39 -168 48 -253 50 -111 2 -160 -16 -197 -72 -44
            -66 -24 -174 40 -216 13 -8 84 -35 157 -60 72 -24 151 -55 174 -69 64 -37 114
            -94 133 -151 23 -67 22 -184 -1 -254 -26 -75 -101 -151 -181 -181 -123 -47
            -363 -35 -484 23 l-46 22 -3 68 c-2 41 1 67 7 67 6 0 46 -12 88 -26 91 -31
            261 -44 329 -25 86 23 126 79 126 174 0 99 -40 135 -215 193 -184 61 -251 104
            -291 188 -41 87 -40 220 3 304 30 59 104 119 175 142 89 29 293 23 386 -11z
            m1590 -484 l0 -495 245 0 245 0 0 -75 0 -75 -335 0 -335 0 0 570 0 570 90 0
            90 0 0 -495z M23823 5209 c-66 -25 -133 -98 -164 -177 -31 -77 -39 -331 -15 -435
            43 -183 134 -261 306 -262 105 0 158 23 225 97 61 68 85 147 92 298 15 337
            -92 501 -326 499 -41 0 -86 -8 -118 -20z"/>
            </g>
          </svg>
        </div>
      </b-col>

      <b-col md="1" lg="1"></b-col>

      <b-col md="5" lg="5" align-self="center" class="text-left"> 

        <div v-if="this.selectedSchools == null || this.selectedSchools.length == 0" >

          <p class="text-center"> Available Facilities on <b><span v-if='date != ""'>{{ date.format("DD-MM-YYYY") }}</span></b>
          from <b>{{fromTime.HH}}{{fromTime.mm}}hrs</b> to <b>{{toTime.HH}}{{toTime.mm}}hrs:</b> </p>

          <div v-if="!currentAvailableFacilities">
            <div v-for='num in 5' :key="num">
              <b-skeleton animation="fade" ></b-skeleton>
              <b-skeleton animation="fade" ></b-skeleton>
              <b-skeleton animation="fade" ></b-skeleton>
              <b-skeleton animation="fade" ></b-skeleton>
              <br>
            </div>
          </div>
          <div v-else class="d-flex justify-content-around">
            <div>
                <div v-for="school in schools" :key="school">
                  <table class="table table-sm table-striped table-bordered" >
                    <thead>
                      <th>{{school}}</th>
                      <th></th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Classrooms: </td>
                        <td >
                          {{currentAvailableFacilities[school]["Class"]}}/{{defaultSchoolFacilities[school]["Class"]}}
                        </td>
                      </tr>
                      <tr>
                        <td>GSRs: </td>
                        <td>{{currentAvailableFacilities[school]["GSR"]}}/{{defaultSchoolFacilities[school]["GSR"]}}</td>
                      </tr>
                      <tr>
                        <td>Seminar Rooms: </td>
                        <td>{{currentAvailableFacilities[school]["Seminar"]}}/{{defaultSchoolFacilities[school]["Seminar"]}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
              <div v-for="school in comingSoonSchools" :key="school">
                  <table class="table table-sm table-striped table-bordered ml-1" v-if="currentAvailableFacilities">
                    <thead>
                      <th>{{school}}</th>
                      <!-- <th></th> -->
                    </thead>
                    <tbody>
                      <tr v-for="num in 3" :key="num">      
                        <td>
                          COMING SOON..
                        </td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>

        </div>

        <div v-else>
          <div class="mt-2">
            <span>Select Floor</span> 
            <multiselect class="mt-2" @close="rePopulate()" @remove="rePopulate()" v-model="selectedFloor" placeholder="Select Floor" label="floor" track-by="value" :options="floors" :searchable="false" :show-labels="false" :multiple="true" :taggable="true" :close-on-select="false" @tag="addTagFloors"></multiselect>
          </div>

          <div class="mt-2">
            <span>Select Facility Type</span> 
            <multiselect class="mt-2" @close="rePopulate()" @remove="rePopulate()" v-model="selectedType" placeholder="Select Facility Type" label="type" track-by="value" :options="facilityType" :searchable="false" :show-labels="false" :multiple="true" :taggable="true" :close-on-select="false" @tag="addTagFacilityType"></multiselect>
          </div>

          <div class="d-flex justify-content-between mt-4">
            <b>Facility List:</b>

            <div class="mb-1">
              <b-button id="noneButton" variant="outline-secondary" v-model="allSelected" @click="toggleAll">
                {{ allSelected ? 'Remove All' : 'Select All' }}
              </b-button>
            </div>
          </div>
          <div style="border:1px solid #CED4DA;height:290px" size="lg" class="d-flex overflow-auto pl-1 rounded" >
            <b-form-checkbox-group  size="lg" v-if="windowWidth < 576" class="ml-0" id="facilityList" v-model="selectedFacility" :options="facilityList" name="facilityList" stacked></b-form-checkbox-group>
            <b-form-checkbox-group  v-else class="ml-0" id="facilityList" v-model="selectedFacility" :options="facilityList" name="facilityList" stacked></b-form-checkbox-group>
          </div>

          <div class="d-flex justify-content-left">
            <b-button @click="sendFacilities" :disabled="disableSearch" id="searchBtn"  class="mt-2 mb-5" style="background-color:#102B72">Search Availability</b-button>
          </div>
        </div>

      </b-col>
    </b-row>
  </b-container>
    
</template>


<script>
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
import Multiselect from 'vue-multiselect';

import app from "../firebase.service.js";

const db = app.database();
const school = db.ref("school");
const bookings = db.ref("booking");

export default {
  name: "Home",
  data() {
      return {	
        windowWidth: window.innerWidth,
        disableSearch: true,
        selectToggle:false,
        allSelected: true,
        date: '',
        fromTime: {
          HH: '',
          mm: '',
        },
        toTime: {
          HH: '',
          mm: '',
        },
        selectedSchools: [],
        selectedFloor: null,
        floors: [],
        selectedType: null,
        facilityType:[],
        selectedFacility: null,
        facilityList:[],
        schools: ['SIS','SOA','SOE/SOSS','LKCSB'],
        comingSoonSchools: ["LKS","SOL","Connexion","Admin"],
        defaultSchoolFacilities : {
                                    "SIS":{"Class": 1,"GSR": 13,"Seminar": 9},
                                    "SOA":{"Class": 1,"GSR": 19,"Seminar": 13},
                                    "SOE/SOSS":{"Class": 7,"GSR": 42,"Seminar": 28},
                                    "LKCSB":{"Class": 5,"GSR": 62,"Seminar": 20}
                                  },
        // comingSoonFacilities    : {
        //                             "LKS":{"Class": "Unavail","GSR": "Unavail","Seminar": "Unavail"},
        //                             "SOL":{"Class": "Unavail","GSR": "Unavail","Seminar": "Unavail"},
        //                             "Connextion":{"Class": "Unavail","GSR": "Unavail","Seminar": "Unavail"},
        //                             "Admin":{"Class": "Unavail","GSR": "Unavail","Seminar": "Unavail"}
        //                           },
        currentAvailableFacilities: null,
        userPastBookings : [],
        filteredPastFacilitiesByMonth: [],
        facilitiesAvailableForRebooking: []

      }
  },
  components: {
    VueTimepicker,
    Multiselect
  },
  mounted() {
    this.displayTime();
    this.getBookingAvailability();
    this.getPastBookings();
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  },
  methods: {
    displayTime: function(){
      let now = new Date();

      let hours = now.getHours();
      let mins = now.getMinutes();

      // If the time visited is after 9.30pm 
      // Set date to next day
      // Set from Time to 8am and to time to 9am 
      if(hours >= 21){
        now.setDate(now.getDate() + 1);
        this.date = now;

        if(mins < 30){
          this.fromTime.HH = "21";
          this.fromTime.mm = "30";

          this.toTime.HH = "22";
          this.toTime.mm = "00";
        }else{
          this.fromTime.HH = "08";
          this.fromTime.mm = "00";

          this.toTime.HH = "09";
          this.toTime.mm = "00";
        }
       
      }else{
        this.date = now;
        // If the time visited is before 8am 
        // Set from Time to 8am and to time to 9am
        if(hours < 8){
          this.fromTime.HH = "08";
          this.fromTime.mm = "00";

          this.toTime.HH = "09";
          this.toTime.mm = "00";
        }
        else{
          if(mins < 30){
            mins = "30";
          }else{
            mins = "00";
            hours++;
          }
          
          //Set fromTime hours
          if(hours < 10){
            hours = "0" + hours;
            this.fromTime.HH = hours;
          }else{
            this.fromTime.HH = hours + "";
          }  
          //Set fromTime mins
          this.fromTime.mm = mins;

          hours = parseInt(this.fromTime.HH) + 1;

          //Set toTime hours
          if(hours < 10){
            hours = "0" + hours;
            this.toTime.HH = hours;
          }else{
            this.toTime.HH = hours + "";
          }  
          //Set toTime mins
          this.toTime.mm = mins;
        }
      }
    
     
    },
    validateFomTimeEntered: function(){
      let toTimeHour = parseInt(this.toTime.HH);
      let fromTimeHour = parseInt(this.fromTime.HH);

      let toTimeMin = parseInt(this.toTime.mm);
      let fromTimeMin = parseInt(this.fromTime.mm);

      if(toTimeHour < fromTimeHour){
        fromTimeHour += 1; 
        if(fromTimeHour < 10){
          fromTimeHour = "0" + fromTimeHour;
          this.toTime.HH = fromTimeHour;
        }else{
          this.toTime.HH = fromTimeHour + "";
        }  
          this.toTime.mm = this.fromTime.mm;
        
        if( fromTimeHour == 22 ){
          this.toTime.mm = "00";
        }
      }

      if(toTimeHour == fromTimeHour && (toTimeMin <= fromTimeMin)){
        fromTimeHour += 1; 
        if(fromTimeHour < 10){
          fromTimeHour = "0" + fromTimeHour;
          this.toTime.HH = fromTimeHour;
        }else{
          this.toTime.HH = fromTimeHour + "";
        }  
        this.toTime.mm = this.fromTime.mm;

        if( fromTimeHour == 22 ){
          this.toTime.mm = "00";
        }
      }

      this.getBookingAvailability();
      this.getPastBookings();
    },
    validateToTimeEntered: function(){
      let toTimeHour = parseInt(this.toTime.HH);
      let fromTimeHour = parseInt(this.fromTime.HH);

      let toTimeMin = parseInt(this.toTime.mm);
      let fromTimeMin = parseInt(this.fromTime.mm);

      if(toTimeHour < fromTimeHour){
        toTimeHour -= 1; 
        if(toTimeHour < 10){
          toTimeHour = "0" + toTimeHour;
          this.fromTime.HH = toTimeHour;
        }else{
          this.fromTime.HH = toTimeHour + "";
        }  
          this.fromTime.mm = this.toTime.mm;

        if( toTimeHour == 7 ){
          this.fromTime.HH = "08";
          this.fromTime.mm = "00";
        }
      }
      
      if(toTimeHour == fromTimeHour && (toTimeMin <= fromTimeMin)){
        toTimeHour -= 1; 
        if(toTimeHour < 10){
          toTimeHour = "0" + toTimeHour;
          this.fromTime.HH = toTimeHour;
        }else{
          this.fromTime.HH = toTimeHour + "";
        }  
        this.fromTime.mm = this.toTime.mm;

        if( toTimeHour == 7 ){
          this.fromTime.HH = "08";
          this.fromTime.mm = "00";
        }
      }

      this.getBookingAvailability();
      this.getPastBookings();
    },
    addTagFloors (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.floors.push(tag);
      this.selectedFloor.push(tag);
    },
    addTagFacilityType (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.facilityType.push(tag);
      this.selectedType.push(tag);1
    },
    rePopulate: function(){     
      let selectedSchoolsArray = this.selectedSchools;
         
      if(selectedSchoolsArray.length != 0){
        school.once("value").then((snapshot) => {

          let data = snapshot.val();
          let floorsInSchoolsSelected = this.floors;
          let facilityTypesInSchoolsSelected = this.facilityType;
          let mergedFacilityList = [];
          let tempFloorToBeSortedArray = [];
          let tempTypeToBeSortedArray = [];

          for(let SelectedSchool of selectedSchoolsArray){

            //populate floors
            for (let floor of data[SelectedSchool].Floors){
              tempFloorToBeSortedArray.push(floor);
            }

            //populate facility types
            for (let type of data[SelectedSchool].FacilityType){
              tempTypeToBeSortedArray.push(type);
            }

            //Default both facility and level not selected
            if( (this.selectedFloor == null || this.selectedFloor.length == 0) && 
                  (this.selectedType == null || this.selectedType.length == 0)){
              for(let facilityType in data[SelectedSchool].FacilityList){
                for(let floors in data[SelectedSchool].FacilityList[facilityType]){
                  for (let facility of data[SelectedSchool].FacilityList[facilityType][floors] ){
                    mergedFacilityList.push(facility);
                  }
                }
              }
            }

            //If floor selected but facility type not selected
            if(this.selectedFloor != null && 
                (this.selectedType == null || this.selectedType.length == 0)){
              for(let facilityType of facilityTypesInSchoolsSelected){
                facilityType = facilityType.value.replaceAll(" ","");
                for(let floor of this.selectedFloor){
                  floor = floor.value.replaceAll(" ","");
                  if(data[SelectedSchool].FacilityList[facilityType][floor]!= null){
                    let facilities = data[SelectedSchool].FacilityList[facilityType][floor];
                    for (let facility of facilities ){
                      mergedFacilityList.push(facility);
                    }
                  }
                }
              }
            }

            //If facility type selected but floor not selected
            if((this.selectedFloor != null) && this.selectedType != null){
              for(let facilityType of this.selectedType){
                facilityType = facilityType.value.replaceAll(" ","");
                for(let floor of this.selectedFloor){
                  floor = floor.value.replaceAll(" ","");
                  if(data[SelectedSchool].FacilityList[facilityType][floor]!= null){
                    let facilities = data[SelectedSchool].FacilityList[facilityType][floor];
                    for (let facility of facilities ){
                      mergedFacilityList.push(facility);
                    }
                  }
                }
              }
            }

            //If both facility type and floor selected
            if((this.selectedFloor == null || this.selectedFloor.length == 0) &&
                  this.selectedType != null){
              for(let facilityType of this.selectedType){
                facilityType = facilityType.value.replaceAll(" ","");
                for(let floor of floorsInSchoolsSelected){
                  floor = floor.value.replaceAll(" ","");
                  if(data[SelectedSchool].FacilityList[facilityType][floor]!= null){
                    let facilities = data[SelectedSchool].FacilityList[facilityType][floor];
                    for (let facility of facilities ){
                      mergedFacilityList.push(facility);
                    }
                  }
                }
              }
            }
          }

          //Uses set to get unique values then use ... to convert back to an array
          tempFloorToBeSortedArray = [...new Set(tempFloorToBeSortedArray)];
          //Sort the floors alphabetically
          tempFloorToBeSortedArray.sort();
          //Clear values in array
          this.floors = [];

          for(let floor of tempFloorToBeSortedArray){
            this.floors.push({floor: floor, value:floor});
          }

          //Uses set to get unique values then use ... to convert back to an array
          tempTypeToBeSortedArray = [...new Set(tempTypeToBeSortedArray)];
          //Sort the floors alphabetically
          tempTypeToBeSortedArray.sort();
          //Clear values in array
          this.facilityType = [];
          for(let type of tempTypeToBeSortedArray){
            this.facilityType.push({type: type, value:type})
          }

          this.facilityList = [];
          this.facilityList = mergedFacilityList;

          this.allSelected = false;
          this.toggleAll();
        });
      }
    },
    toggleAll: function() {

      if(this.allSelected == true){
        this.allSelected = false;
      }else{
        this.allSelected =true;
      }
      this.selectedFacility = this.allSelected ? this.facilityList.slice() : [];
    },
    selectSchool:function(event){
      console.log(event.currentTarget.id);

      let selectedSchool = event.currentTarget.id;

      if(this.selectedSchools.includes(selectedSchool)){
        event.target.style.fill = "#6D757D";
        let newSelectedSchoolArr = [];
        for(let school of this.selectedSchools){
          if(school != selectedSchool){
            newSelectedSchoolArr.push(school);
          }
        }
        this.selectedSchools = newSelectedSchoolArr;
      }else{
        event.target.style.fill = "#102B72";
        this.selectedSchools.push(selectedSchool);
      }
    },
    sendFacilities: function(){
      let fromDateTime = new Date(this.date);
      let toDateTime = new Date(this.date);

      fromDateTime.setHours( this.fromTime.HH,this.fromTime.mm,0,0 );
      toDateTime.setHours( this.toTime.HH,this.toTime.mm,0,0 );

      this.$router.push({
        name: 'Schedule',
        params:{data: {
                fromDateTime : fromDateTime,
                toDateTime : toDateTime,
                selectedFacilities: this.selectedFacility}}
      })
    },
    getBookingAvailability: function(){

      let currentAvailableFacilities = JSON.parse(JSON.stringify(this.defaultSchoolFacilities));

      // console.log(currentAvailableFacilities);

      bookings.once("value").then((snapshot) => {
          let data = snapshot.val();

          let fromDateTime = new Date(this.date);
          let toDateTime = new Date(this.date);

          fromDateTime.setHours( this.fromTime.HH,this.fromTime.mm,0,0 );
          toDateTime.setHours( this.toTime.HH,this.toTime.mm,0,0 );

          Object.values(data).filter((booking)=>{
            //console.log(booking);

            let bookingStartTime = new Date(booking.bookingStart);
            let bookingEndTime = new Date(booking.bookingEnd);
            
            // Only proceed if its the same date
            if(bookingStartTime.toLocaleDateString() === fromDateTime.toLocaleDateString()){
              // console.log("Yo same date");

              //Checks to see if there is an overlap between requested time and booking time
              if( bookingEndTime.getTime() > fromDateTime.getTime()  &&
                    toDateTime.getTime() > bookingStartTime.getTime()){

                // console.log("Collision");
                let school = booking.booking.split(" ")[0];
                let facilityType = booking.booking.split(" ")[1];

  
                currentAvailableFacilities[school][facilityType]--;  
              }

            }
            this.currentAvailableFacilities = currentAvailableFacilities;
          })
      })
    },
    getPastBookings: function(){

      let userID = this.$store.state.userInfo.userID;
      console.log("User id is:"  + userID);

      bookings.once("value").then((snapshot) => {
          let data = snapshot.val();

          Object.values(data).filter((booking)=>{

            if(userID == booking.booker){
       
              this.userPastBookings.push({
                bookingStartDateTime : booking.bookingStart,
                facility : booking.booking
              });
            }
          
          })
        this.filterPastBookings();
      })
    },
    filterPastBookings: function(){
     
      let pastBookings = this.userPastBookings;
      //console.log(pastBookings);

      //Sort the objects by date
      pastBookings.sort(function(a,b){
        //console.log(new Date(b.bookingStartDateTime) - new Date(a.bookingStartDateTime));
        return new Date(b.bookingStartDateTime) - new Date(a.bookingStartDateTime);
      });

      let now = new Date();
      now.setMonth(now.getMonth() - 1);

      // console.log(now);

      // Add bookings facilities into new array that are made from the past month
      for(let booking of pastBookings){

        let date = new Date(booking.bookingStartDateTime);
        if( date > now){
          this.filteredPastFacilitiesByMonth.push(booking.facility);
        }
      }

      //Remove all similar facilities
      this.filteredPastFacilitiesByMonth = [...new Set(this.filteredPastFacilitiesByMonth)];

      //If more than 5 bookings just take the latest 5 unique booking made by user.
      if(this.filteredPastFacilitiesByMonth.length > 5){
        this.filteredPastFacilitiesByMonth.splice(5);
      }
      console.log( this.filteredPastFacilitiesByMonth );


      this.checkIfPastBookingAreAvailableInSystem();
    },
    checkIfPastBookingAreAvailableInSystem: function(){
      if(this.filteredPastFacilitiesByMonth == null || this.filteredPastFacilitiesByMonth.length == 0){
        console.log("You have no past bookings in the past month");
      }else{
        console.log("You have past bookings in the past month");

        bookings.once("value").then((snapshot) => {
          let data = snapshot.val();

          let fromDateTime = new Date(this.date);
          let toDateTime = new Date(this.date);

          fromDateTime.setHours( this.fromTime.HH,this.fromTime.mm,0,0 );
          toDateTime.setHours( this.toTime.HH,this.toTime.mm,0,0 );

          let facilitiesBookedInPastMonth = this.filteredPastFacilitiesByMonth;
          let rejectedFacilities = [];

          Object.values(data).filter((booking)=>{

            //console.log(booking);

            if(facilitiesBookedInPastMonth.includes(booking.booking)){

              let bookingStartTime = new Date(booking.bookingStart);
              let bookingEndTime = new Date(booking.bookingEnd);
              
              // Only proceed if its the same date
              if(bookingStartTime.toLocaleDateString() === fromDateTime.toLocaleDateString()){
                // console.log("Yo same date");

                //Checks to see if there is an overlap between requested time and booking time
                if( bookingEndTime.getTime() > fromDateTime.getTime()  &&
                      toDateTime.getTime() > bookingStartTime.getTime()){

                  rejectedFacilities.push(booking.booking);
                }
            
              }
            }
          })

          var mySet = new Set(facilitiesBookedInPastMonth);
          var valuesToRemove = new Set(rejectedFacilities);

          function removeAll(originalSet, toBeRemovedSet) {
              toBeRemovedSet.forEach(Set.prototype.delete, originalSet);
          }

          // console.log([...mySet]);
          removeAll(mySet, valuesToRemove);
          // console.log([...mySet]);

          this.facilitiesAvailableForRebooking = [...mySet];
          console.log(this.facilitiesAvailableForRebooking);
      
        })
        
      }
      
    },
    selectedFacilitiesFromPastBooking: function(facil){

      this.selectedFacility= [ facil ];

      let fromDateTime = new Date(this.date);
      let toDateTime = new Date(this.date);

      fromDateTime.setHours( this.fromTime.HH,this.fromTime.mm,0,0 );
      toDateTime.setHours( this.toTime.HH,this.toTime.mm,0,0 );

      this.$router.push({
        name: 'Schedule',
        params:{data: {
                fromDateTime : fromDateTime,
                toDateTime : toDateTime,
                selectedFacilities: this.selectedFacility}}
      })

    }
  },
  watch:{
    selectedSchools: function(){
      if(this.selectedSchools == null || this.selectedSchools.length == 0){
        this.disableSearch = true;
        this.floors = [];
        this.facilityType = [];
        this.facilityList = [];
      }else{
        this.rePopulate();
        this.disableSearch = false;
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  .multiselect__tag {
    background:#102B72;
  }
  .multiselect__tag-icon:after {
    color:white;
  }
  .multiselect__option--selected.multiselect__option--highlight {
    background:#102B72;
    color:black;
  }
  .multiselect__option--highlight {
    background:#102B72;
    color:white;
  }
  .multiselect__option--selected{
    background:#C2C2C2;
  }

  .smuMap{
    background-color:#C2C2C2
  }

  .smuMap path{
    fill:#6D757D;
  }

  .vue__time-picker .dropdown ul li:not([disabled]).active, 
  .vue__time-picker .dropdown ul li:not([disabled]).active:hover, 
  .vue__time-picker .dropdown ul li:not([disabled]).active:focus {
    background:#102B72;
    color:#fff;
  }

  /* @media (hover: hover) and (pointer: fine) {
    #SIS:hover,
    #SOA:hover,
    #SOL:hover,
    #Admin:hover,
    #LKS:hover,
    #Connextion:hover{
      fill:#102B72 !important;
    }
  } */

  @media (hover: hover) and (pointer: fine) {
    #SIS:active:hover,
    #SOA:hover:active,
    #SOE_SOSS:hover:active,
    #LKCSB:hover(:active){
       fill:#4c4d50 !important;
    }
  }

    @media (hover: hover) and (pointer: fine) {
    #SIS:hover:not(:active),

    #SOA:hover:not(:active),

    #SOE_SOSS:hover:not(:active),

    #LKCSB:hover:not(:active){
      fill:#1741ac !important;
     
    }
  }

</style>