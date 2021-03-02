function findIp(url) {
    return fetch(url).then(res => res.json());
}

findIp("https://api.ipdata.co?api-key=54d1b4b585a368a01e8ae452579a8d64a87d21a95264e17142a95c70").then(data => {
    console.log(data.ip);
});