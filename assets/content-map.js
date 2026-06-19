const contentMap = {
  zones: [
    {
      id: 'home',
      title: '首页',
      path: '/',
      keywords: ['爱游戏', '首页', '游戏', '推荐'],
      slug: 'home-page'
    },
    {
      id: 'guide',
      title: '攻略',
      path: '/guide',
      keywords: ['爱游戏', '攻略', '教程', '心得'],
      slug: 'game-guide'
    },
    {
      id: 'news',
      title: '资讯',
      path: '/news',
      keywords: ['爱游戏', '新闻', '更新', '公告'],
      slug: 'game-news'
    },
    {
      id: 'community',
      title: '社区',
      path: '/community',
      keywords: ['爱游戏', '论坛', '交流', '玩家'],
      slug: 'community-hub'
    },
    {
      id: 'download',
      title: '下载',
      path: '/download',
      keywords: ['爱游戏', '下载', '客户端', '安装包'],
      slug: 'download-center'
    }
  ],
  tags: [
    '免费', '多人', '联机', '竞技', '动作', '角色扮演', '策略', '休闲',
    '射击', '冒险', '模拟', '体育', '独立', '大型多人在线', '国产', '爱游戏'
  ],
  baseUrl: 'https://main-index-aiyouxi.com.cn',
  siteName: '爱游戏',
  defaultLang: 'zh-CN',
  version: '1.2.0'
};

function searchByKeyword(keyword, zoneList) {
  if (!keyword || keyword.trim() === '') {
    return [];
  }
  const lowerKeyword = keyword.toLowerCase().trim();
  const results = [];
  for (let i = 0; i < zoneList.length; i++) {
    const zone = zoneList[i];
    const matchTitle = zone.title.toLowerCase().includes(lowerKeyword);
    const matchKeywords = zone.keywords.some(kw => kw.toLowerCase().includes(lowerKeyword));
    if (matchTitle || matchKeywords) {
      results.push({
        zoneId: zone.id,
        title: zone.title,
        slug: zone.slug,
        matched: true
      });
    }
  }
  return results;
}

function filterZonesByTag(tag, zoneList) {
  if (!tag || typeof tag !== 'string') {
    return [];
  }
  const lowerTag = tag.toLowerCase();
  return zoneList.filter(zone =>
    zone.keywords.some(kw => kw.toLowerCase() === lowerTag)
  );
}

function buildContentTree(zones) {
  const tree = {};
  zones.forEach(zone => {
    tree[zone.id] = {
      label: zone.title,
      path: zone.path,
      fullUrl: contentMap.baseUrl + zone.path,
      tags: zone.keywords.slice(),
      children: []
    };
  });
  return tree;
}

const contentTree = buildContentTree(contentMap.zones);

function getZoneById(id, zones) {
  return zones.find(zone => zone.id === id) || null;
}

function listAllTags(zones) {
  const tagSet = new Set();
  zones.forEach(zone => {
    zone.keywords.forEach(kw => tagSet.add(kw));
  });
  return Array.from(tagSet).sort();
}