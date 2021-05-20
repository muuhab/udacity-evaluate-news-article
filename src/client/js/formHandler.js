const fetchBack = async (url='',data={}) => {
    const res = await fetch(url,{
        method: 'POST',
        credential: 'same-orgin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        const data = await res.json()
        console.log(data);
        return data
    } catch (error) {
        console.log("error", error);
    }
}

let text=document.getElementById('text')
let agreement=document.getElementById('agreement')
let subjectivity=document.getElementById('subjectivity')
let confidence=document.getElementById('confidence')
let irony=document.getElementById('irony')
let score_tag=document.getElementById('score_tag')

function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value
    
    console.log("::: Form Submitted :::")
    if(Client.validURL(formText))
        fetchBack('http://localhost:8082/api',{url:formText}).then((res)=>{
            text.innerHTML=res.text
            agreement.innerHTML=res.agreement
            subjectivity.innerHTML=res.subjectivity
            confidence.innerHTML=res.confidence
            irony.innerHTML=res.irony
            score_tag.innerHTML=res.score_tag
        })
    else
        alert('Enter a valid URl')
    
}

export { handleSubmit,fetchBack }
