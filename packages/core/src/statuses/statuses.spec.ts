import { describe, it } from 'mocha'
import { expect, assert } from 'chai'

import { Statuses, isStatuses } from './statuses'
import { CodeStatuses } from './code-statuses'
import {
    CamelCaseStatuses,
    PascalCaseStatuses,

    CamelCaseCodeStatuses,
    PascalCaseCodeStatuses,

    LowerDotCaseStatuses,
    LowerDashCaseStatuses,
    LowerSnakeCaseStatuses,

    UpperDotCaseStatuses,
    UpperDashCaseStatuses,
    UpperSnakeCaseStatuses,
} from './cases'

describe('Statuses', () => {
    const casedStatuses = {
        'PascalCase':       PascalCaseStatuses,
        'camelCase':        CamelCaseStatuses,

        'PascalCaseCode':   PascalCaseCodeStatuses,
        'camelCaseCode':    CamelCaseCodeStatuses,

        'lower-dash-case':  LowerDashCaseStatuses,
        'lower.dot.case':   LowerDotCaseStatuses,
        'lower_snake_case': LowerSnakeCaseStatuses,

        'UPPER-DASH-CASE':  UpperDashCaseStatuses,
        'UPPER.DOT.CASE':   UpperDotCaseStatuses,
        'UPPER_SNAKE_CASE': UpperSnakeCaseStatuses,
    }

    describe('Every cased Statuses should inherit default CodeStatuses object (keep API consistence)', () => {

        const statusesInherit = <I extends Statuses>(inherited: I) => <B extends Statuses>(by: B) => () => {
            const shouldRemain = Object.values(inherited)
            const shouldExtend = Object.values(by)

            const allRemain = shouldRemain.every(_ => shouldExtend.includes(_))

            expect(allRemain).equals(true)
        }

        const inheritsCodeStatuses = statusesInherit(CodeStatuses)

        for (const [caseName, statuses] of Object.entries(casedStatuses)) {
            it(caseName, inheritsCodeStatuses(statuses))
        }
    })

    describe('Every cased Statuses object should be assignable to Statuses type', () => {
        for (const [caseName, statuses] of Object.entries(casedStatuses)) {
            it(caseName, () => assert(isStatuses(statuses)))
        }
    })

    describe('isStatuses()', () => {
        it('Should be false', () => {
            expect(isStatuses(null)).to.be.false
            expect(isStatuses(undefined)).to.be.false
            expect(isStatuses({ test: 'test' })).to.be.false
            expect(isStatuses({ test: [] })).to.be.false
            expect(isStatuses({ test: ['', ''] })).to.be.false
        })

        it('Should be true', () => {
            expect(isStatuses({})).to.be.true
            expect(isStatuses({ test: [0, 'test'] })).to.be.true
        })
    })
})