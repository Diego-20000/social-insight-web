/**
 * Módulo de gráficos
 * Crea y gestiona gráficos interactivos con Chart.js desde CDN
 */

let donutChart = null;
let barChart = null;

/**
 * Carga Chart.js desde CDN
 */
function loadChartJS() {
    return new Promise((resolve, reject) => {
        if (typeof Chart !== 'undefined') {
            resolve(Chart);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
        script.onload = () => {
            resolve(window.Chart);
        };
        script.onerror = () => {
            reject(new Error('Error cargando Chart.js'));
        };
        document.head.appendChild(script);
    });
}

/**
 * Inicializa los gráficos
 */
export async function initializeCharts(chartData) {
    try {
        const Chart = await loadChartJS();
        
        // Gráfico de dona
        createDonutChart(Chart, chartData.relationshipChart);
        
        // Gráfico de barras
        createBarChart(Chart, chartData.followAnalysisChart);
        
    } catch (error) {
        console.error('Error inicializando gráficos:', error);
    }
}

/**
 * Crea el gráfico de dona
 */
function createDonutChart(Chart, data) {
    const ctx = document.getElementById('relationshipChart');
    if (!ctx) return;

    donutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.datasets[0].data,
                backgroundColor: data.datasets[0].backgroundColor,
                borderColor: data.datasets[0].borderColor,
                borderWidth: data.datasets[0].borderWidth,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14,
                            weight: '500'
                        },
                        color: '#333'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    borderRadius: 8
                }
            }
        }
    });
}

/**
 * Crea el gráfico de barras
 */
function createBarChart(Chart, data) {
    const ctx = document.getElementById('followAnalysisChart');
    if (!ctx) return;

    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: data.datasets[0].label,
                data: data.datasets[0].data,
                backgroundColor: data.datasets[0].backgroundColor,
                borderColor: data.datasets[0].borderColor,
                borderWidth: data.datasets[0].borderWidth,
                borderRadius: 8,
                hoverBackgroundColor: [
                    'rgba(225, 48, 108, 0.9)',
                    'rgba(64, 93, 230, 0.9)',
                    'rgba(237, 73, 86, 0.9)'
                ]
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.x.toLocaleString('es-ES')} usuarios`;
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    borderRadius: 8
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('es-ES');
                        },
                        font: { size: 12 }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    ticks: {
                        font: { size: 13, weight: '500' }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

/**
 * Actualiza los gráficos con nuevos datos
 */
export function updateCharts(chartData) {
    if (donutChart) {
        donutChart.data.datasets[0].data = chartData.relationshipChart.datasets[0].data;
        donutChart.update();
    }

    if (barChart) {
        barChart.data.datasets[0].data = chartData.followAnalysisChart.datasets[0].data;
        barChart.update();
    }
}

/**
 * Destruye los gráficos
 */
export function destroyCharts() {
    if (donutChart) {
        donutChart.destroy();
        donutChart = null;
    }

    if (barChart) {
        barChart.destroy();
        barChart = null;
    }
}
