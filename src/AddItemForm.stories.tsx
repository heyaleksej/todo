import React from 'react';
import {AddItemForm} from "./AddItemForm";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm ,
    argTypes: {
        addItem: {
            description:'callback'
        },
    },

} as ComponentMeta<typeof AddItemForm>


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    addItem: action('aad'), //для описание что происходит экш и не описывать колбек
};
