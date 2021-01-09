"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const statuses_1 = require("./statuses");
const code_statuses_1 = require("./code-statuses");
const cases_1 = require("./cases");
mocha_1.describe('Statuses', () => {
    const casedStatuses = {
        'PascalCase': cases_1.PascalCaseStatuses,
        'camelCase': cases_1.CamelCaseStatuses,
        'PascalCaseCode': cases_1.PascalCaseCodeStatuses,
        'camelCaseCode': cases_1.CamelCaseCodeStatuses,
        'lower-dash-case': cases_1.LowerDashCaseStatuses,
        'lower.dot.case': cases_1.LowerDotCaseStatuses,
        'lower_snake_case': cases_1.LowerSnakeCaseStatuses,
        'UPPER-DASH-CASE': cases_1.UpperDashCaseStatuses,
        'UPPER.DOT.CASE': cases_1.UpperDotCaseStatuses,
        'UPPER_SNAKE_CASE': cases_1.UpperSnakeCaseStatuses,
    };
    mocha_1.describe('Every cased Statuses should inherit default CodeStatuses object (keep API consistence)', () => {
        const statusesInherit = (inherited) => (by) => () => {
            const shouldRemain = Object.values(inherited);
            const shouldExtend = Object.values(by);
            const allRemain = shouldRemain.every(_ => shouldExtend.includes(_));
            chai_1.expect(allRemain).equals(true);
        };
        const inheritsCodeStatuses = statusesInherit(code_statuses_1.CodeStatuses);
        for (const [caseName, statuses] of Object.entries(casedStatuses)) {
            mocha_1.it(caseName, inheritsCodeStatuses(statuses));
        }
    });
    mocha_1.describe('Every cased Statuses object should be assignable to Statuses type', () => {
        for (const [caseName, statuses] of Object.entries(casedStatuses)) {
            mocha_1.it(caseName, () => chai_1.assert(statuses_1.isStatuses(statuses)));
        }
    });
    mocha_1.describe('isStatuses()', () => {
        mocha_1.it('Should be false', () => {
            chai_1.expect(statuses_1.isStatuses(null)).to.be.false;
            chai_1.expect(statuses_1.isStatuses(undefined)).to.be.false;
            chai_1.expect(statuses_1.isStatuses({ test: 'test' })).to.be.false;
            chai_1.expect(statuses_1.isStatuses({ test: [] })).to.be.false;
            chai_1.expect(statuses_1.isStatuses({ test: ['', ''] })).to.be.false;
        });
        mocha_1.it('Should be true', () => {
            chai_1.expect(statuses_1.isStatuses({})).to.be.true;
            chai_1.expect(statuses_1.isStatuses({ test: [0, 'test'] })).to.be.true;
        });
    });
});
//# sourceMappingURL=statuses.spec.js.map