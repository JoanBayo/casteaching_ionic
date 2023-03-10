export default {
    debug: false,
    user: {
        name: 'Pepe'
    },
    get(state){
        if (this.debug) console.log('gettMessageAction triggered with', state);
        return this[state]
    }
}