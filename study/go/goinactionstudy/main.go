// package에 종속되어야 함
// Namespace로 생각하면 될듯

package main

import (
	"fmt"
	"os"
	"log"
	"github.com/webgenie/go-in-action/blob/master/chapter2/sample/search"
)

// construct 처럼 동작
// 자동 실행
func init() {
	log.SetOutput(os.Stdout)
	//fmt.Println("auto execute init()")
}

func main() {
	//fmt.Println("leejongil")
	search.run("leejongil")
}
