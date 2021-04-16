import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class homeRouteService
{
    constructor(private httpclient: HttpClient){}
    gettrending(): Observable<any>{
        return this.httpclient.get("/apis/trending_movies")
    }

    get_top_rated(): Observable<any>{
        return this.httpclient.get("/apis/top_rated_movies")
    }

    get_popular(): Observable<any>{
        return this.httpclient.get("/apis/popular_movies")
    }

    get_search(m_tv_name:any): Observable<any>{
        var url: string;
        url= "/apis/multi/" + m_tv_name;
        return this.httpclient.get<[any,string[]]>(url)
    }

    get_currently_playing(): Observable<any>{
        
        return this.httpclient.get("/apis/currently_playing_movies")
    }

    get_movie_video(m_id:any) : Observable<any>{
        var url:string;
        url= "/apis/movie_video/" + m_id;
        return this.httpclient.get<[any,string[]]>(url)
    }

    get_movie_details(m_id:any) : Observable<any>{
        var url:string;
        url= "/apis/movie_details/" + m_id;
        return this.httpclient.get<[any,string[]]>(url)
    }

    get_movie_cast(m_id:any) : Observable<any>{
        var url:string;
        url= "/apis/movie_cast/" + m_id;
        return this.httpclient.get<[any,string[]]>(url)
    }

    get_cast_details(c_id:any) : Observable<any>{
        var url:string;
        url= "/apis/cast_details/" + c_id;
        return this.httpclient.get<[any,string[]]>(url)
    }

    get_cast_external_id(c_id:any) : Observable<any>{
        var url:string;
        url= "/apis/cast_external_id/" + c_id;
        return this.httpclient.get<[any,string[]]>(url)
    }

    get_movie_reviews(m_id:any) : Observable<any>{
        var url:string;
        url= "/apis/movie_reviews/" + m_id;
        return this.httpclient.get<[any,string[]]>(url)
    }

    get_recommended_movies(m_id:any) : Observable<any>{
        var url:string;
        url= "/apis/recommended_movies/" + m_id;
        return this.httpclient.get<[any,string[]]>(url)
    }

    get_similar_movies(m_id:any) : Observable<any>{
        var url:string;
        url= "/apis/similar_movies/" + m_id;
        return this.httpclient.get<[any,string[]]>(url)
    }

    gettrendingtv(): Observable<any>{
        return this.httpclient.get("/apis/trending_tv")
    }

    get_top_rated_tv(): Observable<any>{
        return this.httpclient.get("/apis/top_rated_tv")
    }

    get_popluar_tv(): Observable<any>{
        return this.httpclient.get("/apis/popular_tv")
    }

    get_tv_video(m_id:any) : Observable<any>{
        var url:string;
        url= "/apis/tv_video/" + m_id;
        return this.httpclient.get<[any,string[]]>(url)
    }
    get_tv_details(m_id:any) : Observable<any>{
        var url:string;
        url= "/apis/tv_details/" + m_id;
        return this.httpclient.get<[any,string[]]>(url)
    }
    
    get_tv_cast(m_id:any) : Observable<any>{
        var url:string;
        url= "/apis/tv_cast/" + m_id;
        return this.httpclient.get<[any,string[]]>(url)
    }

    get_tv_reviews(m_id:any) : Observable<any>{
        var url:string;
        url= "/apis/tv_reviews/" + m_id;
        return this.httpclient.get<[any,string[]]>(url)
    }

    get_similar_tv(m_id:any) : Observable<any>{
        var url:string;
        url= "/apis/similar_tv/" + m_id;
        return this.httpclient.get<[any,string[]]>(url)
    }
    get_recommended_tv(m_id:any) : Observable<any>{
        var url:string;
        url= "/apis/recommended_tv/" + m_id;
        return this.httpclient.get<[any,string[]]>(url)
    }
}