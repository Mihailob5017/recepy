// offline data

db.enablePersistence()
    .catch(err => {
        if (err.code == 'failed-precondition')
            console.log('persistence failed')
        else if (err.code == 'unimplemented')
            console.log('persistence is not available')
    })

    

// real time listener
db.collection('recipes').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(element => {
        console.log(element)
        if (element.type === 'added')
            renderRecipe(element.doc.data(), element.doc.id)

    });
})



const renderRecipe = (data, id) => {
    document.querySelector('#recipe-container').innerHTML +=
        `   <div data-id="${id}" class="card-panel recipe white row">
                <img src="/img/dish.png" alt="recipe thumb">
            <div class="recipe-details">
            <div class="recipe-title">${data.title}</div>
            <div class="recipe-ingredients">${data.ingredients}</div>
            </div>
            <div class="recipe-delete">
                <i class="material-icons">delete_outline</i>
            </div>
        </div> `
}


