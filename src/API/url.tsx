export const url = {
    auth : {
        createTokenNew : "/authentication/token/new",
        createTokenLogin : "/authentication/token/validate_with_login",
        createSession : "/authentication/session/new",
        
    },
    account : {
        details : "/account",

    },
    tv : {
        discover : "/discover/tv",
        popular : "/tv/popular",
        topRated : "/tv/top_rated",
        airingToday : "/tv/airing_today",
        onTheAir : "/tv/on_the_air",
        changes : "/tv/changes",
        latest : "/tv/latest",
        certification : "/certification/tv/list",
        genre : "/genre/tv/list",

    },
    movie : {
        discover : '/discover/movie',
        popular : "/movie/popular",
        topRated : "/movie/top_rated",
        nowPlaying : "/movie/now_playing",
        upcoming : "/movie/upcoming",
        changes : "/movie/changes",
        latest : "/movie/latest",
        certification : "/certification/movie/list",
        genre : "/genre/movie/list",
    },
    person : {
        latest : "/person/latest",
        changes : "/person/changes",
        popular : "/person/popular",

    }
}