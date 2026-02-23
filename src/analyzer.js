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

    // Encontrar seguidores mutuos
    const mutualFollows = followersList.filter(
        u => followingSet.has(u.username.toLowerCase())
    );

    return {
        followers: followersSet.size,
        following: followingSet.size,
        notFollowingBack,
        youDontFollow,
        mutualFollows,
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
        mutualFollows: data.mutualFollows.length,
        followRatio: data.followers > 0 ? (data.following / data.followers * 100).toFixed(2) : 0,
        engagementRate: data.followers > 0 ? (data.mutualFollows.length / data.followers * 100).toFixed(2) : 0
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
            labels: ['Seguidores mutuos', 'Te siguen pero no los sigues', 'Los sigues pero no te siguen'],
            datasets: [{
                data: [
                    stats.mutualFollows,
                    stats.youDontFollow,
                    stats.notFollowingBack
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

/**
 * Ordena usuarios por criterio
 */
export function sortUsers(users, sortBy = 'username') {
    const sorted = [...users];
    
    switch(sortBy) {
        case 'username':
            sorted.sort((a, b) => a.username.localeCompare(b.username));
            break;
        case 'recent':
            sorted.sort((a, b) => b.timestamp - a.timestamp);
            break;
        case 'oldest':
            sorted.sort((a, b) => a.timestamp - b.timestamp);
            break;
        default:
            sorted.sort((a, b) => a.username.localeCompare(b.username));
    }
    
    return sorted;
}

/**
 * Busca usuarios por término
 */
export function searchUsers(users, searchTerm) {
    if (!searchTerm) return users;
    
    const term = searchTerm.toLowerCase();
    return users.filter(user => 
        user.username.toLowerCase().includes(term)
    );
}

/**
 * Obtiene estadísticas detalladas
 */
export function getDetailedStats(data) {
    const stats = analyzeFollowers(data);
    
    return {
        ...stats,
        totalAccounts: stats.totalFollowers + stats.notFollowingBack,
        unfollowPercentage: stats.totalFollowing > 0 
            ? (stats.notFollowingBack / stats.totalFollowing * 100).toFixed(2) 
            : 0,
        followBackPercentage: stats.totalFollowing > 0 
            ? (stats.mutualFollows / stats.totalFollowing * 100).toFixed(2) 
            : 0
    };
}
