let arr = []
let completeTask = []

/************** Adding event lister to the element **************/

const lister = (element, set) => {
    let deleteNode = element.children[0].children[1];
    deleteNode.classList.add('delete')

    let checkNode = element.children[0].children[0];
    checkNode.classList.add('text');

    if (set)
        checkNode.style.textDecoration = "line-through"


    let arrowUp = element.children[1].children[0];
    let arrowDown = element.children[1].children[1];
    console.log(arrowDown)


    addDeleteListner(deleteNode);
    changeOrder(arrowUp, 0, set)
    changeOrder(arrowDown, 1, set)

    if (!set)
        checkOutput(checkNode)
    else
        checkOutputCompleted(checkNode)
}

/************** Display the output **************/

const displayOutput = () => {

    document.querySelector('#part_1').innerHTML = ''

    for (item of arr) {
        let element = document.createElement('div');
        element.classList.add('list-item')

        element.innerHTML = `
         <div class="top-portion">
             <div>${item}</div>
             <div><i class="fa-solid fa-trash"></i></div>
         </div> 
     
         <div class="arrow">
             <div><i class="fa-solid fa-angle-up fa-lg"></i></div>
             <div><i class="fa-solid fa-angle-down fa-lg"></i></div>
         </div>
         `
        lister(element, 0);
        document.getElementById('part_1').append(element)
    }
}

const displayOutputCompleted = () => {

    document.querySelector('#part_2').innerHTML = ''

    for (item of completeTask) {
        let element = document.createElement('div');
        element.classList.add('list-item')

        element.innerHTML = `
         <div class="top-portion">
             <div>${item}</div>
             <div><i class="fa-solid fa-trash"></i></div>
         </div> 
     
         <div class="arrow">
             <div><i class="fa-solid fa-angle-up fa-lg"></i></div>
             <div><i class="fa-solid fa-angle-down fa-lg"></i></div>
         </div>
         `
        lister(element, 1);
        document.getElementById('part_2').append(element)
    }
}

/************** Adding element to the list **************/

document.getElementById('submit-button').addEventListener("click", () => {
    let input = document.querySelector("#input-val");

    if (input.value == '') {
        return
    }
    arr.push(input.value)

    displayOutput()

    input.value = ""
})

/************** Deleting the element from the list **************/

const addDeleteListner = (element) => {

    element.addEventListener("click", (event) => {
        let valueOfDeletedEntry = event.target.parentElement.parentElement.children[0].innerHTML;

        newArr = arr.filter((task) => {
            return task !== valueOfDeletedEntry
        })

        arr = newArr
        displayOutput()
    })
}

/************** Changing the order of the list **************/

const changeOrder = (element, order, set) => {

    let dummy = []

    if (!set)
        dummy = arr;
    else
        dummy = completeTask;

    element.addEventListener("click", () => {
        if (!order) {
            let element = dummy.splice(0, 1);
            dummy.push(element[0]);
        }
        else {
            let element = dummy.splice(dummy.length - 1, 1);
            dummy.unshift(element[0])
        }
        if (!set)
            displayOutput()
        else
            displayOutputCompleted()
    })

    if (!set)
        arr = dummy;
    else
        completeTask = dummy;
}

/************** Changing the order of the list **************/

const checkOutput = (element) => {
    element.addEventListener("click", () => {
        completeTask.push(element.innerHTML)
        element.parentElement.children[1].children[0].click()
        displayOutputCompleted()
    })
}

const checkOutputCompleted = (element) => {
    element.addEventListener("click", () => {
        arr.push(element.innerHTML);
        let dummy = completeTask.filter((task)=>{
            return task!==element.innerHTML;
        })
        completeTask = dummy;

        displayOutput();
        displayOutputCompleted();
    })
}