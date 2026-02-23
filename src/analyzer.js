/**
 * Procesa los datos exportados de Instagram
 */
export function processInstagramData(data) {
    // Extraer followers
    let followers = [];
    let following = [];

    // Buscar en la estructura del JSON
    if (data.followers_1) {
        followers = data.followers_1;
    } else if (Array.isArray(data)) {
        followers = data;
    }

    // Buscar following
    if (data.relationships_following) {
        following = data.relationships_following;
    } else if (data.following) {
        following = data.following;
    }

    // Extraer usernames
    const followersSet = new Set();
    const followersList = [];

    followers.forEach(item => {
        if (item.string_list_data && item.string_list_data[0]) {
            const username = item.string_list_data[0].value;
            followersSet.add(username.toLowerCase());
            followersList.push({
                username,
                href: item.string_list_data[0].href,
                timestamp: item.string_list_data[0].timestamp
            });
        }
    });

    const followingSet = new Set();
    const followingList = [];

    following.forEach(item => {
        let username = '';
        let href = '';
        let timestamp = 0;

        if (item.title) {
            username = item.title;
            if (item.string_list_data && item.string_list_data[0]) {
                href = item.string_list_data[0].href;
                timestamp = item.string_list_data[0].timestamp;
            }
        } else if (item.string_list_data && item.string_list_data[0]) {
            username = item.string_list_data[0].value;
            href = item.string_list_data[0].href;
            timestamp = item.string_list_data[0].timestamp;
        }

        if (username) {
            followingSet.add(username.toLowerCase());
            followingList.push({
                username,
                href,
                timestamp
            });
        }
    });

    // Análisis
    const notFollowingBack = followingList.filter(
        u => !followersSet.has(u.username.toLowerCase())
    );

    const youDontFollow = followersList.filter(
        u => !followingSet.has(u.username.toLowerCase())
    );

    return {
        followers: followersSet.size,
        following: followingSet.size,
        notFollowingBack,
        youDontFollow,
        followersList,
        followingList,
        followersSet,
        followingSet
    };
}

/**
 * Calcula estadísticas adicionales
 */
export function analyzeFollowers(data) {
    const stats = {
        totalFollowers: data.followers,
        totalFollowing: data.following,
        notFollowingBack: data.notFollowingBack.length,
        youDontFollow: data.youDontFollow.length,
        mutualFollows: data.followers - data.youDontFollow.length,
        followRatio: data.followers > 0 ? (data.following / data.followers * 100).toFixed(2) : 0
    };

    return stats;
}

/**
 * Genera datos para gráficos
 */
export function generateChartData(data) {
    const stats = analyzeFollowers(data);

    return {
        relationshipChart: {
            labels: ['Te siguen y los sigues', 'Te siguen pero no los sigues', 'Los sigues pero no te siguen'],
            datasets: [{
                data: [
                    stats.totalFollowers - stats.youDontFollow.length,
                    stats.youDontFollow.length,
                    stats.notFollowingBack.length
                ],
                backgroundColor: [
                    '#31a24c',
                    '#405de6',
                    '#ed4956'
                ],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        followAnalysisChart: {
            labels: ['Seguidores', 'Siguiendo', 'No te siguen de vuelta'],
            datasets: [{
                label: 'Cantidad',
                data: [
                    stats.totalFollowers,
                    stats.totalFollowing,
                    stats.notFollowingBack
                ],
                backgroundColor: [
                    'rgba(225, 48, 108, 0.7)',
                    'rgba(64, 93, 230, 0.7)',
                    'rgba(237, 73, 86, 0.7)'
                ],
                borderColor: [
                    '#e1306c',
                    '#405de6',
                    '#ed4956'
                ],
                borderWidth: 2
            }]
        }
    };
}
