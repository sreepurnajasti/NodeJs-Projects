const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

const mimeTypes =  {
  'html': 'text/html',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpg',
  'png': 'image/png',
  'js': 'test/javascript',
  'css': 'text/css'
}

http.createServer(function(req, res){
  var uri = url.parse(req.url).pathname
  var fileName = path.join(process.cwd(), unescape(uri))
  console.log('filename:'+ fileName);
  var stats;
  try{
    stats = fs.lstatSync(fileName)
    //console.log(stats)
    if(stats.isFile()){
      console.log('file')
      // console.log(mimeType[path.extname(fileName).split('.').reverse()[0]])
      var mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]]
      res.writeHead(200, {'Content-type': mimeType})
      var fileStream = fs.createReadStream(fileName)
      fileStream.pipe(res)
    } else if(stats.isDirectory()){
      console.log('directory')
      res.writeHead(302, {
        'Location': 'index.html'
      })
      res.end()
    } else{
      res.writeHead(500, {'Content-type': 'text/plain'})
      res.write('500 Internal Error\n')
      res.end()
    }
  } catch(e){
    console.log(e)
    res.writeHead(404, {'content-type': 'text/plain'})
    res.write('404 Not Found \n')
    res.end()
    return
  }
}).listen(1337)