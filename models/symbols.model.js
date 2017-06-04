
const Symbols = require('../schemas/symbols.schema');

exports.getRandom = (amount) => {
    return Symbols.aggregate([{ $sample: { size: amount } }]);
};
