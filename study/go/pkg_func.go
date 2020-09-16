// 고언어는 packge로 구성
// "main" package는 프로그램 시작 포인트
// package 명 중복사용 partial class 느낌적인 느낌..
package main

import (
	"fmt"
	"math"
	"math/rand" // 뒤져보면 rand package가 math package를 import 하고있음
	"time"
)

func main() {
	fmt.Println("xxxxx")
	fmt.Println("this time is : ", time.Now()) // 대문자로 시작하면 exported 된다. 외부접근한정자 사용 되는듯
	rand.Seed(1010)
	fmt.Println(rand.Intn(11))
	fmt.Println(math.Sqrt(7))
	fmt.Println(math.Pi)
	fmt.Println(add(10, 20)) // 동일 package 내니까 package명 붙힐 필요 없음, 대문자 시작안해도 접근 가능
	fmt.Println(add2(10, 22))
	fmt.Println(swap("a", "b"))
	fmt.Println(split(10))

	var i int // 자동 초기화 되네
	fmt.Println(i, var1, var2, var3)
	var j, k int = 10, 20
	fmt.Println(j, k)
	varMethod()
}

// func명이 소문자로 시작했으니 외부접근이 안되겠지
func add(x int, y int) int {
	return x + y
}

// 머또 생략가능 불라 불라~~
func add2(x, y int) int {
	return x + y
}

// 오버로딩 안되네 ;;
// func add2(x, y string) string {
// 	return x + y
// }

func swap(x, y string) (string, string) {
	return y, x
}

func split(sum int) (x, y int) {
	x = sum + 1
	y = sum + 2
	return // naked return
}

var var1, var2, var3 int

// testVar := "jongil"
// func 밖에서는 := 안되네..

func varMethod() {
	jongil := "leejongil" // 선언동시에 대입경우 var 대신 := , func내에서만 사용가능!!
	fmt.Println(jongil)

	// autocasting
	isTrue, intVar, strVar := true, 10, "leejongil"
	fmt.Println(isTrue, intVar, strVar)
}
