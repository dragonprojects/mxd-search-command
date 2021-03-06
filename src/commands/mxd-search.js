module.exports = ({ AssetsQuery, heimdall, hostname, pageSize }) => async ({ args, reply }) => {
  hostname = hostname || 'store.maxdome.de';
  const query = (new AssetsQuery())
    .filter('contentTypeSeriesOrMovies')
    .filter('search', args)
    .query('pageSize', pageSize);
  const assets = await heimdall.getAssets(query);
  if (assets.length) {
    const texts = assets.map(asset => reply.link(`https://${hostname}/${asset.id}`, asset.title));
    texts.push(reply.link(`https://${hostname}/suche?search=${encodeURIComponent(args)}`, 'show all...'));
    reply.send(texts);
  } else {
    reply.send(`no results found for "${args}"`);
  }
};
