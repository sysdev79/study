package main

import (
	"fmt"
)

func gorutine() {
	fmt.Println("gorutine()")
}

func main() {
	go gorutine()
	fmt.Println("main()")

}
