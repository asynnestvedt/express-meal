# express-meal
auto-load express routes based on filesystem naming

```
const loader = require('../../express-meal')

/** ... glob load all your routes **/
const router = loader.getRouter({
    cwd: path.join(__dirname, './modules'),
    glob: '**/*routes*.js'
})
```
