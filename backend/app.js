var express  = require("express");
var app = express();
const https = require('https');
const cors = require('cors');
const path = require('path');
// const e = require("express");

app.use(cors());
app.use(express.static(path.join(__dirname,'dist/frontend')));


app.get("/",(req,res)=>{
        res.send("Hello world");
});

app.get("/apis/multi/:name", (req,res)=>{
      
var address = 'https://api.themoviedb.org/3/search/multi?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&query=' + req.params.name;
https.get(address, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    var movie_data = [];
    var data_parsed = JSON.parse(data)
    // data["results"].length
    for(let i = 0;i<Math.min(7, data_parsed["results"].length); i++)
    {
        // movie_data[i] = data_parsed["results"][i]
        if( data_parsed["results"][i]["media_type"] == "movie")
        {
          if(data_parsed["results"][i]["backdrop_path"] != null && data_parsed["results"][i]["title"]!= undefined)
          {
            movie_data.push({
              "id" : data_parsed["results"][i]["id"],
              "title" : data_parsed["results"][i]["title"],
              "backdrop_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["backdrop_path"],
              "media_type" : data_parsed["results"][i]["media_type"]
              
            })
          }
          
        }
        
        else if(data_parsed["results"][i]["media_type"] == "tv")
        {

          if(data_parsed["results"][i]["backdrop_path"] != null && data_parsed["results"][i]["title"]!= undefined)
          {
            movie_data.push({
              "id" : data_parsed["results"][i]["id"],
              "title" : data_parsed["results"][i]["title"],
              "backdrop_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["backdrop_path"],
              "media_type" : data_parsed["results"][i]["media_type"]
              
            })
          }

          
        }
    }
    
    // res.send(JSON.parse(data));
    res.send(movie_data);

    // console.log(movie_data);
    return movie_data;
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

})

app.get("/apis/trending_movies", (req,res)=>{
  
  
  
  var address = "https://api.themoviedb.org/3/trending/movie/day?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = {};
      var m_data = []
      var data_parsed = JSON.parse(data)
      var j = -1;
      var count = -1;
      for(let i = 0;i<Math.min(24, data_parsed["results"].length); i++)
      {
          
         
        if(data_parsed["results"][i]["poster_path"] != null && data_parsed["results"][i]["title"]!= undefined)
        {
          count+=1
        }
        
            if (count % 6 == 0) {
              j++;
              m_data[j] = []
              m_data[j].push(
                {
                  "id" : data_parsed["results"][i]["id"],
                  "title" : data_parsed["results"][i]["title"],
                  "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                  "media_type" : data_parsed["results"][i]["media_type"]
                  
                }
              )
          }
          else {
            m_data[j].push(
              {
                "id" : data_parsed["results"][i]["id"],
                "title" : data_parsed["results"][i]["title"],
                "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                "media_type" : data_parsed["results"][i]["media_type"]
                
              }
            )
          }
            
          
      }
      

      if(m_data.length == j+1 && m_data.length!=0)
      {
        var n =m_data[j].length%6;
        if(n != 0)
        {
          for(let k =0;k<6-n;k++)
          {
            m_data[j].push({})
          }
        }
      
      }
      

      
      // res.send(JSON.parse(data));
      res.send(m_data);
      // console.log(m_data);
      return m_data;
  
      
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/top_rated_movies", (req,res)=>{
  
  
  
    var address = "https://api.themoviedb.org/3/movie/top_rated?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
    https.get(address, (resp) => {
      let data = '';
    
      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        
        var m_data = [];
        var data_parsed = JSON.parse(data)
        var j = -1;
        var count= -1;
      for(let i = 0;i<Math.min(24, data_parsed["results"].length); i++)
      {
          
         
        if(data_parsed["results"][i]["poster_path"] != null && data_parsed["results"][i]["title"]!= undefined)
        {
          count+=1
        }
            if (count % 6 == 0) {
              j++;
              m_data[j] = []
              m_data[j].push(
                {
                  "id" : data_parsed["results"][i]["id"],
                  "title" : data_parsed["results"][i]["title"],
                  "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                  "media_type" : "movie"
                  
                }
              )
          }
          else {
            m_data[j].push(
              {
                "id" : data_parsed["results"][i]["id"],
                "title" : data_parsed["results"][i]["title"],
                "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                "media_type" : "movie"
                
              }
            )
          }
            
          
      }


      if(m_data.length == j+1 && m_data.length!=0)
      {
        var n =m_data[j].length%6;
        if(n != 0)
        {
          for(let k =0;k<6-n;k++)
          {
            m_data[j].push({})
          }
        }
      
      }

        
      
        res.send(m_data);
        // console.log("top rated movies");
        // console.log(m_data);
        return m_data;
        // console.log(movie_data);
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
    
})

app.get("/apis/currently_playing_movies", (req,res)=>{
  
  
  

  var address = "https://api.themoviedb.org/3/movie/now_playing?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = [];
      var data_parsed = JSON.parse(data)
      var count = 0
      var k = 0;
      for(let i = 0;i<Math.min(5, data_parsed["results"].length); i++)
      {
        if(data_parsed["results"][i]["poster_path"] != null && data_parsed["results"][i]["title"]!= undefined)
        {
          
          movie_data.push({
            "id" : data_parsed["results"][i]["id"],
            "title" : data_parsed["results"][i]["title"],
            "backdrop_path" : "https://image.tmdb.org/t/p/original" + data_parsed["results"][i]["backdrop_path"],
            "media_type" : "movie"
            
          })
          k=k+1;
        }

        
        
         
            
          
      }
      
      // res.send(JSON.parse(data));
      res.send(movie_data);
  
      // console.log(movie_data);
      return movie_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})

app.get("/apis/popular_movies", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/movie/popular?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = {};
      var m_data = [];
      var data_parsed = JSON.parse(data)
      var count = -1;
      var j = -1;
      
      for(let i = 0;i<Math.min(24, data_parsed["results"].length); i++)
      {
          
         
        if(data_parsed["results"][i]["poster_path"] != null && data_parsed["results"][i]["title"]!= undefined)
        {
          count+=1
        }
            if (count % 6 == 0) {
              j++;
              m_data[j] = []
              m_data[j].push(
                {
                  "id" : data_parsed["results"][i]["id"],
                  "title" : data_parsed["results"][i]["title"],
                  "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                  "media_type" : "movie"
                  
                }
              )
          }
          else {
            m_data[j].push(
              {
                "id" : data_parsed["results"][i]["id"],
                "title" : data_parsed["results"][i]["title"],
                "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                "media_type" : "movie"
                
              }
            )
          }
            
          
      }

      if(m_data.length == j+1 && m_data.length!=0)
      {
        var n =m_data[j].length%6;
        if(n != 0)
        {
          for(let k =0;k<6-n;k++)
          {
            m_data[j].push({})
          }
        }
      
      }

      
        
        res.send(m_data);
        // console.log("popuar movies")
        // console.log(m_data);
        return m_data;
      
      // res.send(JSON.parse(data));
     
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/recommended_movies/:movie_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/movie/"+req.params.movie_id+"/recommendations?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1";
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = {};
      var data_parsed = JSON.parse(data)
      var m_data = [];
      var j = -1;
      var count = -1;
      for(let i = 0;i<Math.min(24, data_parsed["results"].length); i++)
      {
          
        if(data_parsed["results"][i]["poster_path"] != null && data_parsed["results"][i]["title"]!= undefined)
        {
          count+=1
        }
           
            if (count % 6 == 0) {
              j++;
              m_data[j] = []
              m_data[j].push(
                {
                  "id" : data_parsed["results"][i]["id"],
                  "title" : data_parsed["results"][i]["title"],
                  "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                  "media_type" : "movie"
                  
                }
              )
          }
          else {
            m_data[j].push(
              {
                "id" : data_parsed["results"][i]["id"],
                "title" : data_parsed["results"][i]["title"],
                "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                "media_type" : "movie"
                
              }
            )
          }
            
          
      }

      if(m_data.length == j+1 && m_data.length!=0)
      {
        var n =m_data[j].length%6;
        if(n != 0)
        {
          for(let k =0;k<6-n;k++)
          {
            m_data[j].push({})
          }
        }
      
      }
      
      
      
      // res.send(JSON.parse(data));
      res.send(m_data);
      // console.log("Recommended Movies");
      // console.log(m_data);
      return m_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})

app.get("/apis/similar_movies/:movie_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/movie/"+req.params.movie_id+"/similar?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1";
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = {};
      var data_parsed = JSON.parse(data)
      
      var m_data = [];
      var j = -1;
      var count =-1;
      for(let i = 0;i<Math.min(24, data_parsed["results"].length); i++)
      {
        if(data_parsed["results"][i]["poster_path"] != null && data_parsed["results"][i]["title"]!= undefined)
        {
          count+=1
        }
         
            
            if (count % 6 == 0) {
              j++;
              m_data[j] = []
              m_data[j].push(
                {
                  "id" : data_parsed["results"][i]["id"],
                  "title" : data_parsed["results"][i]["title"],
                  "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                  "media_type" : "movie"
                  
                }
              )
          }
          else {
            m_data[j].push(
              {
                "id" : data_parsed["results"][i]["id"],
                "title" : data_parsed["results"][i]["title"],
                "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                "media_type" : "movie"
                
              }
            )
          }
            
          
      }

      
      if(m_data.length == j+1 && m_data.length!=0)
      {
        var n =m_data[j].length%6;
        if(n !=0 )
        {
          for(let k =0;k<6-n;k++)
          {
            m_data[j].push({})
          }
        }
      
      }
      
      
      // res.send(JSON.parse(data));
      res.send(m_data);
      // console.log("Similar Movies");
      // console.log(m_data);
      return m_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/movie_video/:movie_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/movie/"+req.params.movie_id+"/videos?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1";
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = [];
      var data_parsed = JSON.parse(data)
      
      for(let i = 0;i<Math.min(7, data_parsed["results"].length); i++)
      {
          
         
            movie_data.push({
              "site" : data_parsed["results"][i]["site"],
              "type" : data_parsed["results"][i]["type"],
              "name" : data_parsed["results"][i]["name"],
              // "key" : "https://www.youtube.com/embed/" +data_parsed["results"][i]["key"]
              "key" : "https://www.youtube.com/watch?v=" +data_parsed["results"][i]["key"]
              // "media_type" : data_parsed["results"][i]["media_type"]
              
            })
          
      }
      if(movie_data.length == 0)
      {
        movie_data.push({
          "key" : "https://www.youtube.com/watch?v=tzkWB85ULJY"
        })
      }
      
      // res.send(JSON.parse(data));
      res.send(movie_data);
      // console.log("Movie Video");
      // console.log(movie_data);
      return movie_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/movie_details/:movie_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/movie/" + req.params.movie_id + "?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = {};
      var data_parsed = JSON.parse(data)
      
      // for(let i = 0;i<Math.min(7, data_parsed["results"].length); i++)
      // {
          var gen = []
          
          for(let j = 0 ;j<data_parsed["genres"].length; j++)
          {
              gen.push(data_parsed["genres"][j]["name"])
          }

          var sp_lang = []
          for(let j = 0 ;j<data_parsed["spoken_languages"].length; j++)
          {
              sp_lang.push(data_parsed["spoken_languages"][j]["english_name"])
          }

          var broken_run_time = ""
          
          if(data_parsed["runtime"]!= undefined)
          {
            
            var hrs =  Math.floor(data_parsed["runtime"]/60)
            var mi = data_parsed["runtime"]%60
            
            if(hrs==1)
            {
              broken_run_time = String(hrs) + " hr " + String(mi) + " mins ";
            }
            else
            {
              broken_run_time = String(hrs) + " hrs " + String(mi) + " mins ";
            }
          }
          
          
         
            movie_data =  {
              
              "title" : data_parsed["title"],
              "genres" : gen,
              "spoken_languages" :  sp_lang,
              "release_date" : data_parsed["release_date"].split("-")[0],
              "runtime" : broken_run_time,
              "overview" : data_parsed["overview"],
              "vote_average" : data_parsed["vote_average"],
              "tagline" : data_parsed["tagline"],
              "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["poster_path"],
              // "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
              // "media_type" : data_parsed["results"][i]["media_type"]
              
            }
          
      // }
      
      // res.send(JSON.parse(data));
      res.send(movie_data);
      // console.log("Movie Details");
      // console.log(movie_data);
      return movie_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/movie_reviews/:movie_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/movie/" + req.params.movie_id + "/reviews?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = [];
      var data_parsed = JSON.parse(data)
      
      for(let i = 0;i<Math.min(10, data_parsed["results"].length); i++)
      {
        let temp = ""
          if(!(data_parsed["results"][i]["author_details"]["avatar_path"]))
          {
            temp = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU" ;
          }
          else{
            // console.log(data_parsed["results"][i]["author_details"]["avatar_path"])
            // console.log(data_parsed["results"][i]["author_details"]["avatar_path"].split("/"))
            if (data_parsed["results"][i]["author_details"]["avatar_path"].split("/").length <=2)
            {
              temp = "https://image.tmdb.org/t/p/original/" + data_parsed["results"][i]["author_details"]["avatar_path"];
            }
            else
            {
              temp = data_parsed["results"][i]["author_details"]["avatar_path"].slice(1,-1);
            }
            // temp = "https://image.tmdb.org/t/p/original/" + data_parsed["results"][i]["author_details"]["avatar_path"];
            // .split("/").slice(-1)[0]
            // temp = data_parsed["results"][i]["author_details"]["avatar_path"].slice(1,-1);
            
          }
            ti = data_parsed["results"][i]["created_at"].split("T")
            li = []
            var d = new Date(ti[0]);
            var mon = d.toLocaleString('default', { month: 'long' });
            console.log(d);
            var list=d.toDateString().split(" ")
            var s = mon + " " + list[2] + ", " +list[3];
            li.push(s)
            if(ti[1].slice(1,-1).split(".")[0].split(":")[0] <12)
            {
              li.push(ti[1].slice(1,-1).split(".")[0] + " AM")
            }
            else
            {
              li.push(ti[1].slice(1,-1).split(".")[0] + " PM")
            }
            // li.push(ti[1].slice(1,-1).split(".")[0])
            movie_data.push({
              
              "author" : data_parsed["results"][i]["author"],
              "content" : data_parsed["results"][i]["content"],
              "created_at" : li,
              "url" : data_parsed["results"][i]["url"],
              "rating" : data_parsed["results"][i]["author_details"]["rating"],
              
              "avatar_path" :temp
            })
          
      }
      
      // res.send(JSON.parse(data));
      res.send(movie_data);
      // console.log("Movie Reviews");
      // console.log(movie_data);
      return movie_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/movie_cast/:movie_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/movie/" + req.params.movie_id + "/credits?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = [];
      var data_parsed = JSON.parse(data)
      
      for(let i = 0;i< data_parsed["cast"].length; i++)
      {
        if (data_parsed["cast"][i]["profile_path"])
        {

          movie_data.push({
              
            "id" : data_parsed["cast"][i]["id"],
            "name" : data_parsed["cast"][i]["name"],
            "character" : data_parsed["cast"][i]["character"],
            "profile_path" : "https://image.tmdb.org/t/p/w500/" + data_parsed["cast"][i]["profile_path"]
          })

        }
         
            
          
      }
      
      // res.send(JSON.parse(data));
      res.send(movie_data);
      // console.log("Movie Cast");
      // console.log(movie_data);
      return movie_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/trending_tv", (req,res)=>{
  
  
  
  var address = "https://api.themoviedb.org/3/trending/tv/day?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = {};
      var m_data = [];
      var data_parsed = JSON.parse(data)
      var j = -1;
      var count =-1;
      for(let i = 0;i<Math.min(24, data_parsed["results"].length); i++)
      {
          
        if(data_parsed["results"][i]["poster_path"] != null && data_parsed["results"][i]["name"]!= undefined)
        {
          count+=1
        }
            
            if (count % 6 == 0) {
              j++;
              m_data[j] = []
              m_data[j].push(
                {
                  "id" : data_parsed["results"][i]["id"],
                  "name" : data_parsed["results"][i]["name"],
                  "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                  "media_type" : data_parsed["results"][i]["media_type"]
                  
                }
              )
          }
          else {
            m_data[j].push(
              {
                "id" : data_parsed["results"][i]["id"],
                "name" : data_parsed["results"][i]["name"],
                "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                "media_type" : data_parsed["results"][i]["media_type"]
                
              }
            )
          }
            
          
      }
      
      if(m_data.length == j+1 && m_data.length!=0)
      {
        var n =m_data[j].length%6;
        if(n !=0 )
        {
          for(let k =0;k<6-n;k++)
          {
            m_data[j].push({})
          }
        }
      
      }

      res.send(m_data);
      // console.log(m_data);
      return m_data;
  
      
      
      
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/top_rated_tv", (req,res)=>{
  
  
  
  var address = "https://api.themoviedb.org/3/tv/top_rated?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
     
      var data_parsed = JSON.parse(data)
      var m_data = [];
      var data_parsed = JSON.parse(data)
      var j = -1;
      var count = -1;
      for(let i = 0;i<Math.min(24, data_parsed["results"].length); i++)
      {
        if(data_parsed["results"][i]["poster_path"] != null && data_parsed["results"][i]["name"]!= undefined)
        {
          count+=1
        }
         
            
            if (count % 6 == 0) {
              j++;
              m_data[j] = []
              m_data[j].push(
                {
                  "id" : data_parsed["results"][i]["id"],
                  "name" : data_parsed["results"][i]["name"],
                  "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                  "media_type" : data_parsed["results"][i]["media_type"]
                  
                }
              )
          }
          else {
            m_data[j].push(
              {
                "id" : data_parsed["results"][i]["id"],
                "name" : data_parsed["results"][i]["name"],
                "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                "media_type" : data_parsed["results"][i]["media_type"]
                
              }
            )
          }
            
          
      }
      
      if(m_data.length == j+1 && m_data.length!=0)
      {
        var n =m_data[j].length%6;
        if(n !=0 )
        {
          for(let k =0;k<6-n;k++)
          {
            m_data[j].push({})
          }
        }
      
      }
      
      res.send(m_data);
      // console.log(m_data);
      return m_data;
      
      
      
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/popular_tv", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/tv/popular?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = {};
      var data_parsed = JSON.parse(data)
      var m_data = [];
      
      var j = -1;
      var count = -1;
      for(let i = 0;i<Math.min(24, data_parsed["results"].length); i++)
      {
        if(data_parsed["results"][i]["poster_path"] != null && data_parsed["results"][i]["name"]!= undefined)
        {
          count+=1
        }
         
            
            if (count % 6 == 0) {
              j++;
              m_data[j] = []
              m_data[j].push(
                {
                  "id" : data_parsed["results"][i]["id"],
                  "name" : data_parsed["results"][i]["name"],
                  "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                  "media_type" : data_parsed["results"][i]["media_type"]
                  
                }
              )
          }
          else {
            m_data[j].push(
              {
                "id" : data_parsed["results"][i]["id"],
                "name" : data_parsed["results"][i]["name"],
                "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                "media_type" : data_parsed["results"][i]["media_type"]
                
              }
            )
          }
            
          
      }
      
     
      if(m_data.length == j+1 && m_data.length!=0)
      {
        var n =m_data[j].length%6;
        if(n !=0 )
        {
          for(let k =0;k<6-n;k++)
          {
            m_data[j].push({})
          }
        }
      
      }

      res.send(m_data);
      // console.log(m_data);
      return m_data;
      
      
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/recommended_tv/:tv_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/tv/"+req.params.tv_id+"/recommendations?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1";
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      
      var data_parsed = JSON.parse(data)
      
      var m_data = [];
      var j = -1;
      var count = -1;

      for(let i = 0;i<Math.min(24, data_parsed["results"].length); i++)
      {

        if(data_parsed["results"][i]["poster_path"] != null && data_parsed["results"][i]["name"]!= undefined)
        {
          count+=1
        }
          
            if (count % 6 == 0) {
              j++;
              m_data[j] = []
              m_data[j].push(
                {
                  "id" : data_parsed["results"][i]["id"],
                  "title" : data_parsed["results"][i]["name"],
                  "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                  "media_type" : data_parsed["results"][i]["media_type"]
                  
                }
              )
          }
          else {
            m_data[j].push(
              {
                "id" : data_parsed["results"][i]["id"],
                "title" : data_parsed["results"][i]["name"],
                "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                "media_type" : data_parsed["results"][i]["media_type"]
                
              }
            )
          }
            
          
      }

      
      if(m_data.length == j+1 && m_data.length!=0)
      {
        var n =m_data[j].length%6;
      for(let k =0;k<6-n;k++)
      {
        m_data[j].push({})
      }
      }
      
      res.send(m_data)
      // console.log("Recommended tv")
      // console.log(m_data)
      return m_data;


    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/similar_tv/:tv_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/tv/"+req.params.tv_id+"/similar?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1";
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      
      var data_parsed = JSON.parse(data)
      
      var m_data = [];
      var j = -1;
      var count = -1;
      for(let i = 0;i<Math.min(24, data_parsed["results"].length); i++)
      {
          if(data_parsed["results"][i]["poster_path"] != null && data_parsed["results"][i]["name"]!= undefined)
        {
          count+=1
        }
            if (count % 6 == 0) {
              j++;
              m_data[j] = []
              m_data[j].push(
                {
                  "id" : data_parsed["results"][i]["id"],
                  "title" : data_parsed["results"][i]["name"],
                  "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                  "media_type" : data_parsed["results"][i]["media_type"]
                  
                }
              )
          }
          else {
            m_data[j].push(
              {
                "id" : data_parsed["results"][i]["id"],
                "title" : data_parsed["results"][i]["name"],
                "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["results"][i]["poster_path"],
                "media_type" : data_parsed["results"][i]["media_type"]
                
              }
            )
          }
            
          
      }

      
      if(m_data.length == j+1 && m_data.length!=0)
      {
        var n =m_data[j].length%6;
      for(let k =0;k<6-n;k++)
      {
        m_data[j].push({})
      }
      }
      
      
      // res.send(JSON.parse(data));
      res.send(m_data);
      // console.log("Similar TV");
      // console.log(m_data);
      return m_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/tv_video/:tv_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/tv/"+req.params.tv_id+"/videos?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1";
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = {};
      var data_parsed = JSON.parse(data)
      
      for(let i = 0;i<Math.min(7, data_parsed["results"].length); i++)
      {
          
         
            movie_data[i] = {
              "site" : data_parsed["results"][i]["site"],
              "type" : data_parsed["results"][i]["type"],
              "name" : data_parsed["results"][i]["name"],
              "key" : "https://www.youtube.com/watch?v=" +data_parsed["results"][i]["key"]
              // "media_type" : data_parsed["results"][i]["media_type"]
              
            }
          
      }
      if(movie_data.length == 0)
      {
        movie_data.push({
          "key" : "https://www.youtube.com/watch?v=tzkWB85ULJY"
        })
      }
      // res.send(JSON.parse(data));
      res.send(movie_data);
      // console.log("TV Video");
      // console.log(movie_data);
      return movie_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/tv_details/:tv_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/tv/" + req.params.tv_id + "?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = {};
      var data_parsed = JSON.parse(data)
      
      // for(let i = 0;i<Math.min(7, data_parsed["results"].length); i++)
      // {
          var gen = []
          
          for(let j = 0 ;j<data_parsed["genres"].length; j++)
          {
              gen.push(data_parsed["genres"][j]["name"])
          }

          var sp_lang = []
          for(let j = 0 ;j<data_parsed["spoken_languages"].length; j++)
          {
              sp_lang.push(data_parsed["spoken_languages"][j]["english_name"])
          }
          
          var broken_run_time = ""
          console.log(data_parsed["runtime"]);
          if(data_parsed["episode_run_time"] !== undefined)
          {
            
            var hrs =  Math.floor(data_parsed["episode_run_time"]/60)
            var mi = data_parsed["episode_run_time"]%60
            
            if(hrs==1)
            {
              broken_run_time = String(hrs) + " hr " + String(mi) + " mins ";
            }
            else
            {
              broken_run_time = String(hrs) + " hrs " + String(mi) + " mins ";
            }
          }
          // console.log("data-parsed : ", data_parsed)
          // console.log("first-air-date ", data_parsed["first_air_date"])
          
            movie_data={
              
              "title" : data_parsed["name"],
              "genres" : gen,
              "spoken_languages" :  sp_lang,
              "release_date" : data_parsed["first_air_date"].split("-")[0],
              "runtime" : broken_run_time,
              "overview" : data_parsed["overview"],
              "vote_average" : data_parsed["vote_average"],
              "tagline" : data_parsed["tagline"],
              "poster_path" : "https://image.tmdb.org/t/p/w500" + data_parsed["poster_path"],
              // "media_type" : data_parsed["results"][i]["media_type"]
              
            }
          
      // }
      
      // res.send(JSON.parse(data));
      res.send(movie_data);
      // console.log("TV Details");
      // console.log(movie_data);
      return movie_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/tv_reviews/:tv_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/tv/" + req.params.tv_id + "/reviews?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = [];
      var data_parsed = JSON.parse(data)

      for(let i = 0;i<Math.min(10, data_parsed["results"].length); i++)
      {
        let temp = ""
          if(!(data_parsed["results"][i]["author_details"]["avatar_path"]))
          {
            temp = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU" ;
          }
          else{
            // console.log(data_parsed["results"][i]["author_details"]["avatar_path"])
            // console.log(data_parsed["results"][i]["author_details"]["avatar_path"].split("/"))
            if (data_parsed["results"][i]["author_details"]["avatar_path"].split("/").length <=2)
            {
              temp = "https://image.tmdb.org/t/p/original/" + data_parsed["results"][i]["author_details"]["avatar_path"];
            }
            else
            {
              temp = data_parsed["results"][i]["author_details"]["avatar_path"].slice(1,-1);
            }
            // temp = "https://image.tmdb.org/t/p/original/" + data_parsed["results"][i]["author_details"]["avatar_path"];
            // .split("/").slice(-1)[0]
            // temp = data_parsed["results"][i]["author_details"]["avatar_path"].slice(1,-1);
            
          }
          ti = data_parsed["results"][i]["created_at"].split("T")
          li = []
          var d = new Date(ti[0]);
          var mon = d.toLocaleString('default', { month: 'long' });
          console.log(d);
          var list=d.toDateString().split(" ")
          var s = mon + " " + list[2] + ", " +list[3];
          li.push(s)
          if(ti[1].slice(1,-1).split(".")[0].split(":")[0] <12)
          {
            li.push(ti[1].slice(1,-1).split(".")[0] + " AM")
          }
          else
          {
            li.push(ti[1].slice(1,-1).split(".")[0] + " PM")
          }
            movie_data.push({
              
              "author" : data_parsed["results"][i]["author"],
              "content" : data_parsed["results"][i]["content"],
              "created_at" : li,
              "url" : data_parsed["results"][i]["url"],
              "rating" : data_parsed["results"][i]["author_details"]["rating"],
              
              "avatar_path" :temp
            })
          
      }
      
      // res.send(JSON.parse(data));
      res.send(movie_data);
      // console.log("Movie Reviews");
      // console.log(movie_data);
      return movie_data;


      
      
    });
    
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/tv_cast/:tv_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/tv/" + req.params.tv_id + "/credits?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = [];
      var data_parsed = JSON.parse(data)
      
      for(let i = 0;i<Math.min(7, data_parsed["cast"].length); i++)
      {
        if (data_parsed["cast"][i]["profile_path"])
        {

          movie_data.push({
              
            "id" : data_parsed["cast"][i]["id"],
            "name" : data_parsed["cast"][i]["name"],
            "character" : data_parsed["cast"][i]["character"],
            "profile_path" : "https://image.tmdb.org/t/p/w500/" + data_parsed["cast"][i]["profile_path"]
          })

        }
         
            
          
      }
      
      // res.send(JSON.parse(data));
      res.send(movie_data);
      // console.log("TV Cast");
      // console.log(movie_data);
      return movie_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})



app.get("/apis/cast_details/:cast_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/person/" + req.params.cast_id + "?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = {};
      var data_parsed = JSON.parse(data)
      
      // for(let i = 0;i<Math.min(7, data_parsed["results"].length); i++)
      // {
          var gend = {
            0 : undefined,
            1 : "Female",
            2 : "Male"
          }
          
            movie_data= {
              
              "birthday" : data_parsed["birthday"],
              "place_of_birth": data_parsed["place_of_birth"],
              "gender" : gend[data_parsed["gender"]],
              "name" : data_parsed["name"],
              "homepage" : data_parsed["homepage"],
              "also_known_as" : data_parsed["also_known_as"],
              "known_for_department" : data_parsed["known_for_department"],
              "biography" : data_parsed["biography"]
            }
          
      // }
      
      // res.send(JSON.parse(data));
      res.send(movie_data);
      // console.log("Cast Details");
      // console.log(movie_data);
      return movie_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})


app.get("/apis/cast_external_id/:cast_id", (req,res)=>{
  
  var address = "https://api.themoviedb.org/3/person/" + req.params.cast_id + "/external_ids?api_key=7c927eeb627dead1b8656c3bba5ff506&language=en-US&page=1"
  https.get(address, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      var movie_data = {};
      var data_parsed = JSON.parse(data)
      
      // for(let i = 0;i<Math.min(7, data_parsed["results"].length); i++)
      // {
        
        if(data_parsed["imdb_id"])
        {
          var imdb = "http://imdb.com/name/"+ data_parsed["imdb_id"]
        }
        else
        {
          var imdb = false
        }
        if(data_parsed["facebook_id"])
        {
          var fb = "http://facebook.com/" + data_parsed["facebook_id"]
        }
        else
        {
          var fb = false
        }
        if(data_parsed["instagram_id"])
        {
          var ins = "http://instagram.com/" + data_parsed["instagram_id"]
        }
        else
        {
          var ins = false
        }
        if(data_parsed["twitter_id"])
        {
          var tw = "http://twitter.com/" + data_parsed["twitter_id"]
        }
        else
        {
          var tw = false
        }
          
            movie_data = {
              
              
              "imdb_id" : imdb,
              "facebook_id" : fb,
              "instagram_id" : ins,
              "twitter_id" : tw,
              
            }
          
      // }
      
      // res.send(JSON.parse(data));
      res.send(movie_data);
      // console.log("Cast External Ids");
      // console.log(movie_data);
      return movie_data;
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
})

app.use('/*', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/frontend/index.html' ))
})
app.listen(8080, function(){
    console.log("Listening on port 8080");
})