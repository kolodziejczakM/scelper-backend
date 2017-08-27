const newScenarioTemplate = require('../templates/new-scenario.template');
const newScenarioRequestTemplate = require('../templates/new-scenario-request.template');

const templatesRegistry = {
    newScenarioTemplate,
    newScenarioRequestTemplate
};

exports.getTemplate = (name) => {
    const template = Object.keys(templatesRegistry).find(template => template === name);

    if (!template) {
        console.warn(`Cannot find template: ${name}`);
    }

    return templatesRegistry[template];
};
