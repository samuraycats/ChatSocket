import { createStore } from 'vuex'
import { USER_GENERAL } from '../src/constants/models';

export const store = createStore({
    state() {
        return {
            account: USER_GENERAL,
            message: "",
            messages: [],
            userTalk: USER_GENERAL,
            users:[]
        }
    },
    mutations: {
        addUsers(state){
            state.users = this.state.users;
        },

        selectedUserTalk(state) {
            state.userTalk = this.state.userTalk;
        },

        addMessages(state) {
            state.messages = this.state.messages.sort((a, b) => a.date > b.date);
        },

        addMessage(state) {
            state.message = this.state.message;
        },

        saveAccount(state) {
            state.account = this.state.account
        }

    },
    actions: {
        addUsersAction(context){
            context.commit('addUsers');
        },

        selectedUserTalkAction(context) {
            context.commit('selectedUserTalk');
        },

        addMessagesAction(context) {
            context.commit('addMessages');
        },

        saveAccountAction(context) {
            context.commit('saveAccount');
        },

        addMessageAction(context) {
            context.commit('addMessage');
        }
    },
    getters: {
        // ================= Users =================
        getUsers(state){
            return state.users;
        },

        getUsersMessages(state){
            return state.users.messages;
        },

        // ================= account section =================
        getAccount(state) {
            return state.account;
        },

        getUserName(state) {
            return state.account.user;
        },

        getUserId(state) {
            return state.account.id;
        },

        getUserState(state) {
            return state.account.state
        },
        // ================= message section =================
        getMessage(state) {
            return state.message
        },

        getMessages(state) {
            return JSON.stringify(state.messages);
        },
        // ================  account talk section ================
        getUserTalk(state) {
            return state.userTalk;
        },

        getUserTalkUserName(state) {
            return state.userTalk.user;
        },

        getUserTalkSocket(state) {
            return state.userTalk.socket;
        },

        getUserTalkId(state) {
            return state.userTalk.id;
        }
    }
});