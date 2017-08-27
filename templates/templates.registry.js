const newScenarioTemplate = require('../templates/new-scenario.template');
const newScenarioRequestTemplate = require('../templates/new-scenario-request.template');

const templatesRegistry = {
    newScenarioTemplate,
    newScenarioRequestTemplate
};

exports.getTemplate = (templateName) => {

    return Object.keys(templatesRegistry).find(template => {
        if (template === templateName) {
            return {
                getHTML: templatesRegistry[template].getHTML,
                getOptions: templatesRegistry[template].getOptions
            };
        }
    });
};
