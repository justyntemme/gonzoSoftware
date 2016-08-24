FROM golang

ADD . /go/src/github.com/justyntemme/nextwave


RUN go build github.com/justyntemme/nextwave


ENTRYPOINT /go/src/github.com/justyntemme/nextwave/nextwave

EXPOSE 8080

