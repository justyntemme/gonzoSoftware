FROM golang:1.8

RUN go get github.com/justyntemme/nextwave
RUN cp -r /go/src/github.com/justyntemme/nextwave/public /go/bin/
EXPOSE 8080
ENTRYPOINT ["nextwave"]

EXPOSE 8080

