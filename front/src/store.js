import { createStore } from 'vuex'
import { USER_GENERAL } from '../src/constants/models';

export const store = createStore({
    state() {
        return {
            msg: "vuex desde cero",
            account:  { id: null, user: "", date: null, socket: null, status: false },

            message: "",
            messages: [{ id: "", user: "Temporal", status: false }],

            userTalk: USER_GENERAL,
        }
    },
    mutations: {
        selectedUserTalk (state){
            state.userTalk = this.state.userTalk;
        },

        addMessages(state){
            state.messages = this.state.messages;
        },

        addMessage(state) {
            state.message = this.state.message;
        },

        saveAccount(state) {
            state.account = this.state.account
        }

    },
    actions: {
        selectedUserTalkAction(context){
            context.commit('selectedUserTalk');
        },

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

        // ================= account section =================
        getAccount(state){
            return state.account;
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
        // ================= message section =================
        getMessage(state){
            return state.message
        },

        getMessages(state){
            return JSON.stringify(state.messages);
        },
        // ================  account talk section ================
        getUserTalk(state){
            return  state.userTalk;
        },

        getUserTalkUserName(state){
            return  state.userTalk.user;
        },

        getUserTalkSocket(state){
            return  state.userTalk.socket;
        },

        getUserTalkId(state){
            return  state.userTalk.id;
        }
    }
});