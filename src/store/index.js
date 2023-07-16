import { createStore } from 'vuex'
import auth from "./modules/auth.module";
import company from "./modules/company.module";
import plant from "./modules/plant.module";
import shop from "./modules/shop.module";
import line from "./modules/line.module";

import machine from "./modules/machine.module";
import user from "./modules/user.module";
import group from "./modules/group.module";

import observations from "./modules/observation.module"
import pos from "./modules/pos.module"
import job from "./modules/job.module"
import jobType from "./modules/jobType.module"

export default createStore({
    state: {
        sidebarVisible: '',
        sidebarUnfoldable: false,
    },
    mutations: {
        toggleSidebar(state) {
            state.sidebarVisible = !state.sidebarVisible
        },
        toggleUnfoldable(state) {
            state.sidebarUnfoldable = !state.sidebarUnfoldable
        },
        updateSidebarVisible(state, payload) {
            state.sidebarVisible = payload.value
        },
    },
    actions: {},
    modules: {
        auth,
        user,
        group,

        company,
        plant,
        shop,
        line,
        machine,

        observations,
        pos,
        job,
        jobType
    },
})