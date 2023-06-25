
interface Props {
    failedIcon_styles: string
}
const SearchFailedIcon = ({ failedIcon_styles }: Props) => {
    return (
        <svg className={`${failedIcon_styles}`} version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="auto" height="auto" viewBox="0 0 200.000000 200.000000"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <path d="M734 1931 c-105 -27 -192 -104 -218 -192 -9 -29 -13 -56 -9 -60 5 -4
41 -10 80 -13 l73 -7 12 28 c24 55 49 82 93 98 57 22 104 14 150 -27 66 -57
43 -130 -70 -220 -80 -64 -104 -111 -112 -221 l-6 -87 85 0 86 0 4 76 3 75 97
92 c139 131 164 198 114 302 -49 103 -139 157 -271 161 -44 2 -94 -1 -111 -5z
m240 -65 c90 -44 138 -134 116 -217 -9 -31 -36 -67 -115 -148 -85 -89 -105
-115 -110 -147 -14 -85 -13 -84 -50 -84 l-35 0 0 60 c0 85 18 120 92 179 86
70 113 111 113 176 0 82 -56 138 -151 150 -63 8 -126 -22 -169 -82 -26 -36
-35 -42 -67 -42 -33 -1 -38 2 -38 21 0 12 11 38 25 58 71 103 259 139 389 76z"/>
                <path d="M1184 1863 c33 -49 56 -116 56 -161 0 -29 11 -46 70 -108 117 -124
173 -261 174 -424 1 -116 -14 -181 -65 -285 -104 -212 -316 -346 -550 -347
-118 -1 -181 13 -288 64 -157 75 -288 233 -331 403 -50 194 -3 402 124 558 45
55 47 60 36 91 -12 37 -1 106 25 157 23 44 19 43 -44 -5 -146 -113 -257 -275
-303 -443 -32 -120 -29 -298 6 -418 64 -214 204 -384 396 -484 117 -61 198
-82 332 -88 147 -7 264 17 391 81 l85 42 163 -198 c176 -213 207 -238 287
-238 142 0 233 153 166 282 -10 19 -319 292 -403 355 -3 2 5 20 18 41 45 75
82 165 102 250 31 129 24 292 -19 419 -68 202 -204 364 -384 458 l-70 37 26
-39z m184 -149 c160 -147 242 -338 242 -562 0 -115 -27 -220 -87 -342 -26 -52
-48 -98 -50 -101 -7 -15 55 -77 209 -208 92 -78 177 -156 190 -173 60 -85 0
-210 -109 -225 -72 -10 -100 13 -274 223 -93 113 -169 196 -182 199 -14 4 -53
-9 -107 -34 -132 -61 -195 -75 -345 -76 -150 0 -223 18 -360 88 -120 62 -245
190 -308 317 -96 195 -110 399 -40 593 33 92 63 146 130 229 65 80 79 87 87
46 11 -54 7 -69 -28 -110 -124 -145 -176 -379 -126 -572 52 -204 175 -354 365
-445 106 -51 170 -66 290 -65 174 0 317 59 449 184 272 259 283 661 25 944
-46 51 -57 69 -62 109 -9 64 5 62 91 -19z"/>
                <path d="M756 1059 c-35 -41 -35 -88 0 -123 48 -47 124 -32 150 30 40 95 -84
172 -150 93z m99 -29 c40 -45 -20 -105 -65 -65 -26 24 -25 50 2 69 29 21 41
20 63 -4z"/>
            </g>
        </svg>

    )
}

export default SearchFailedIcon