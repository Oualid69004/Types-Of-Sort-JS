const fs = require("fs");
const nonDigitalRegEx = /[^0-9-\+\s]+/g;
const fileName = process.argv[2];

// Sorting strategy counters
let bubbleCount = 0;
let insertCount = 0;
let selectCount = 0;
let quickCount = 0;

//******* bubble Sort *******// 
const bubbleSort =(arr)=>{
    
    for (let i = 0; i < arr.length; i++) {
       
        for (let j = 0; j < (arr.length-i); j++) {
            bubbleCount +=1;
            if (arr[j-1] > arr[j]) {
                let temp = arr[j-1]
                arr[j-1] = arr[j]
                arr[j]=temp
            }
            
        }
        
    }
    //console.log('Tri à bulle: ' + counter + 'comparaisons');
    return arr;
    
}

//******* Insertion Sort */
const insertionSort =(arr)=>{
    
    
    
    for (let i = 0; i < arr.length -1; i++) {
       let temp = arr[i]
       let j= i;
        while (j>0 && arr[j-1]<temp) {
            insertCount += 1;
            arr[j]=arr[j-1]
            j--;
        }    
        arr[j]=temp;   
    }
    //console.log('Tri par insertion: ' + counter + 'comparaisons');
    return arr;
    
}

//******* Selection Sort */

const selectionSort =(arr)=>{
    
    let counter =0;
    
    for (let i = 0; i < (arr.length-1); i++) {
       let min = i;
       for (let j = i+1; j < arr.length; j++) {
        selectCount += 1;
           if (arr[j]<arr[min]) {
               min = j
           }

       }  
       if (min != i) {
           [arr[i],arr[min]]=[arr[min],arr[i]];
       }
    }
    //console.log('Tri par selection: ' + counter + 'comparaisons');
    return arr;
    
}

//********* Quick Sort */
const quickSort = (array, left = 0, right = array.length - 1) => {
    const partition = (array, left, right) => {
      let pivot = array[Math.floor((right + left) / 2)];
      while (left <= right) {
        while (array[left] < pivot) {
          left++;
        }
        while (array[right] > pivot) {
          right--;
        }
        if (left <= right) {
          quickCount += 1;
          [array[left], array[right]] = [array[right], array[left]];
          left++;
          right--;
        }
      }
      return left;
    };
  
    let copy = [...array];
    let s = copy.length;
    if (s > 1) {
      let index = partition(copy, left, right);
      // yes, it says left = 0, but I can't just replace left with 0
      // been there, it gets stuck in an infinity loop
      if (left > index - 1) {
        quickSort(copy, 0, index - 1);
      }
      if (index < right) {
        quickSort(copy, index, s - 1);
      }
    }
    return copy;
  };


  //******* general */

  const openFileWithCatch = (error)=>{
      if (error) {
          Console.error(error);
          return;
      }
      console.log(`${fileName} opened...`);
  };

  const parseArrayCatch = (data)=>{
    if (nonDigitalRegEx.test(data)) {
        console.log("Non-digital character detected. Will be removed...");
      }
      let refArray = Array.from(data.replace(nonDigitalRegEx, "").split(" "));
      return refArray.map((x) => +x); 
  };
  const printFinalArray = (array) => {
    console.log("Following array obtained...");
    console.log(array);
  };


  //*** display results */

  const displayResults = (array)=>{
    const bubbleResult = bubbleSort(array);
    const insertResult = insertionSort(array);
    const selectResult = selectionSort(array);
    const quickResult = quickSort(array);

    const resultString = (strategy, result, count) => {
        return `${strategy} sort => [${result}] with ${count} comparisons`;
      };
    
      console.log("Here are the performances of different sorting strategies:");
      console.log(resultString("Bubble", bubbleResult, bubbleCount));
      console.log(resultString("Insertion", insertResult, insertCount));
      console.log(resultString("Selection", selectResult, selectCount));
      console.log(resultString("Quick", quickResult, quickCount));
    

  }


  //******** Execution  */

  fs.readFile(fileName, "utf8", (error, data) => {
    openFileWithCatch(error);
    const array = parseArrayCatch(data);
    printFinalArray(array);
    displayResults(array);
  });