package web

import (
    "fmt"
    "net/http"
)

func Run() {
    panic(http.ListenAndServe(":8080", &logServer{
        hdl: http.FileServer(http.Dir("/go/src/github.com/justyntemme/nextwave/public/")),
    }))
}

type logServer struct {
    hdl http.Handler
}

func (l *logServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Println(r.RemoteAddr, r.URL, r.URL.Path)
    l.hdl.ServeHTTP(w, r)
}
