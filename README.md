# Stack Docker Compose para Pruebas de Carga con k6

Este repositorio proporciona un stack Docker Compose diseñado para realizar pruebas de carga con k6 y analizar las métricas generadas utilizando Prometheus, Grafana e InfluxDB. Kafka y Zookeeper son componentes opcionales que se pueden integrar para escenarios más avanzados.

## ¿Qué es k6?

k6 es una herramienta moderna de pruebas de carga de código abierto que facilita la prueba del rendimiento de tus aplicaciones. Este stack te proporciona un entorno listo para usar con k6 y las herramientas necesarias para monitorear y analizar los resultados de las pruebas.

## Componentes

*   **k6:** La herramienta principal para la ejecución de pruebas de carga.
*   **Prometheus:** Recolector de métricas que extrae datos de k6.
*   **Grafana:** Plataforma de visualización de datos que muestra las métricas recolectadas por Prometheus en dashboards interactivos.
*   **InfluxDB:** Base de datos de series temporales utilizada para almacenar las métricas a largo plazo.
*   **Kafka y Zookeeper (Opcional):** Se pueden utilizar para gestionar mensajes o para escenarios de prueba más complejos que requieran la simulación de flujos de datos.

## Flujo de Datos

1.  k6 ejecuta las pruebas de carga y genera métricas.
2.  Prometheus recolecta estas métricas exponiendo un endpoint que k6 utiliza.
3.  Grafana consulta a Prometheus para mostrar las métricas en dashboards configurables.
4.  InfluxDB almacena las métricas para su análisis histórico y a largo plazo.
5.  (Opcional) Kafka y Zookeeper pueden integrarse para gestionar la comunicación entre k6 y otros servicios o para simular flujos de datos.

## Requisitos Previos

*   Docker
*   Docker Compose

## Cómo Ejecutar

1.  Clona este repositorio:

    ```bash
    git clone [se quitó una URL no válida]
    ```

2.  Navega al directorio del repositorio:

    ```bash
    cd tu-repositorio
    ```

3.  Inicia el stack:

    ```bash
    docker-compose up -d
    ```

## Configuración

### Configuración de k6

Los scripts de prueba de k6 se encuentran en el directorio `./load-testing`. Puedes modificar los scripts existentes o crear nuevos. Asegúrate de configurar k6 para que envíe las métricas a Prometheus. Un ejemplo de configuración en un script de k6 podría ser:

```javascript
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const res = http.get('http://your-app-service:3000'); // Reemplaza con la URL de tu aplicación
  check(res, { 'status was 200': (r) => r.status == 200 });
}