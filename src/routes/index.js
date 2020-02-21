const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/profile/:username', async (ctx, next)=>{
  const {username} = ctx.params
 ctx.body = {
   title:'this is profile page',
   username
 }
})

router.get('/loadmore/:username/:page', async (ctx, next) => {
      const {username, page} = ctx.params
    ctx.body = {
        username,
      page
    }
 }
)

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
