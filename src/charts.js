import { generateChartData } from './analyzer.js';

let relationshipChart = null;
let followAnalysisChart = null;

/**
 * Inicializa los gráficos
 */
export function initializeCharts(analysisData) {
    // Importar Chart.js dinámicamente
    import('https://cdn.jsdelivr.net/npm/chart.js').then(({ default: Chart }) => {
        const chartData = generateChartData(analysisData);

        // Destruir gráficos anteriores si existen
        if (relationshipChart) relationshipChart.destroy();
        if (followAnalysisChart) followAnalysisChart.destroy();

        // Gráfico de relaciones (Pie)
        const relationshipCtx = document.getElementById('relationshipChart')?.getContext('2d');
        if (relationshipCtx) {
            relationshipChart = new Chart(relationshipCtx, {
                type: 'doughnut',
                data: chartData.relationshipChart,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: { size: 12 },
                                padding: 15,
                                usePointStyle: true
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
                            }
                        }
                    }
                }
            });
        }

        // Gráfico de análisis (Bar)
        const followAnalysisCtx = document.getElementById('followAnalysisChart')?.getContext('2d');
        if (followAnalysisCtx) {
            followAnalysisChart = new Chart(followAnalysisCtx, {
                type: 'bar',
                data: chartData.followAnalysisChart,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.parsed.x.toLocaleString('es-ES')}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return value.toLocaleString('es-ES');
                                }
                            }
                        }
                    }
                }
            });
        }
    }).catch(err => console.error('Error cargando Chart.js:', err));
}
