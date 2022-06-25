<template>
    <div class="projects">

        <div class="up-menu">
            <button class="btn btn-primary">
                Добавить проект
            </button>
        </div>
        <div class="project-list">
            <div class="card project">
                <h3 class="project__title">project1</h3>

                <div class="project__tasks">
                    <div class="task">
                        task1
                    </div>
                    <div class="task">
                        task2
                    </div>
                </div>
            </div>
            <div class="card project">
                <h3 class="project__title">project1</h3>

                <div class="project__tasks">
                    <div class="task">
                        <label class="checkbox-wrapper">
                            <input type="checkbox">
                            <div class="fake-checkbox">

                            </div>
                        </label>
                        task1
                    </div>
                    <div class="task">
                        <checkbox-view>label </checkbox-view>
                        task2
                    </div>
                </div>
            </div>
            <div class="card project">
                <h3 class="project__title">project1</h3>

                <div class="project__tasks">
                    <div class="task">
                        <label class="checkbox-wrapper">
                            <input type="checkbox">
                            <div class="fake-checkbox">

                            </div>
                        </label>
                        task1
                    </div>
                    <div class="task">
                        <label class="checkbox-wrapper">
                            <input type="checkbox">
                            <div class="fake-checkbox">

                            </div>
                        </label>
                        task1
                    </div>
                    <div class="task">
                        <label class="checkbox-wrapper">
                            <input type="checkbox">
                            <div class="fake-checkbox">

                            </div>
                        </label>
                        task1
                    </div>
                    <div class="task">
                        <label class="checkbox-wrapper">
                            <input type="checkbox">
                            <div class="fake-checkbox">

                            </div>
                        </label>
                        task1
                    </div>
                    <div class="task">
                        <checkbox-view>label </checkbox-view>
                        task2
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import CheckboxView from "../components/CheckboxView.vue";

export default {
    name: 'projects',

    components: {
        CheckboxView
    }
}

</script>

<style lang="sass">
    @import "@/assets/sass/projects"
</style>