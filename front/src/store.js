import { createStore } from 'vuex'

export const store = createStore({
    state() {
        return {
            msg: "vuex desde cero",
            account: { id: "", user: "temporal", status: false },

            message: "",
            messages: [{ id: "", user: "temporal", status: false }],
        }
    },
    mutations: {
        addMessages(state){
            state.messages = this.state.messages;
        },

        addMessage(state) {
            state.message = this.state.message;
            //state.mensajes = [state.mensaje, ...state.mensajes]
        },

        saveAccount(state) {
            state.account = this.state.account
        }

    },
    actions: {
        addMessagesAction(context){
            context.commit('addMessages');
        },

        saveAccountAction(context) {
            context.commit('saveAccount');
        },

        addMessageAction(context){
            context.commit('addMessage');
        }
    },
    getters: {
        mensaje(state) {
            return state.msg;
        },

        getUserName(state) {
            return state.account.user;
        },

        getUserId(state) {
            return state.account.id;
        },

        getUserState(state){
            return state.account.state
        },
        // ================= messagesection =================
        getMessage(state){
            return state.message
        },

        getMessages(state){
            return JSON.stringify(state.messages);
        }
    }
});