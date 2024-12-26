import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
    stages: [
        { duration: '2m', target: 50 },    // Subida suave a 50 usuarios
        { duration: '5m', target: 50 },    // Mantener 50 usuarios
        { duration: '2m', target: 100 },   // Subir a 100 usuarios
        { duration: '5m', target: 100 },   // Mantener 100 usuarios
        { duration: '2m', target: 0 },     // Bajar a 0
    ],
    thresholds: {
        'http_req_duration': ['p(95)<2000'], // 95% de peticiones bajo 2s
        'errors': ['rate<0.1']               // menos del 10% de errores
    }
};

const BASE_URL = 'https://tu-sitio-wordpress.com';  // Cambia esto
const ENDPOINTS = [
    '/',                    // Página principal
    '/blog/',              // Blog
    '/contacto/',          // Página de contacto
    '/wp-json/wp/v2/posts' // API de WordPress
];

export default function() {
    for (let endpoint of ENDPOINTS) {
        let response = http.get(`${BASE_URL}${endpoint}`);
        
        check(response, {
            'está respondiendo': (r) => r.status === 200,
            'tiempo de respuesta OK': (r) => r.timings.duration < 2000
        });

        sleep(Math.random() * 3 + 1); // Pausa aleatoria entre 1-4 segundos
    }
}