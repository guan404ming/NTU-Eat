import { ref }  from 'vue'

export function getApi(){
    const api = ref('https://ntu-eat.com/api/')
    // const api = ref('http://172.20.10.4/ntu-eat/api/')
    return api
}

export function getData(){
    const data = ref('https://ntu-eat.com/data-img/')
    // const data = ref('http://172.20.10.4/ntu-eat/data-img/')
    return data
}

export function popup(msg, buttonMsg, icon){
    this.$swal.fire({
        text: msg,
        icon: icon,
        confirmButtonText: buttonMsg,
        iconColor: '#EBDECE',
        customClass: {
        icon: 'popup-icon',
        confirmButton: 'popup-button',
        text: 'popup-text',
        popup: 'popup',
        }
    })

    return popup
}




