

app.get('/admin-visual', requireLogin, async (req, res) => {
  const site = await getSite();
  res.render('admin/visual', { site });
});
