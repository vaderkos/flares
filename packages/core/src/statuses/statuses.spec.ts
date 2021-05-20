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

    CamelCaseCodeInfoStatuses,
    CamelCaseCodeSuccessStatuses,
    CamelCaseCodeRedirectStatuses,
    CamelCaseCodeClientStatuses,
    CamelCaseCodeServerStatuses,

    PascalCaseCodeInfoStatuses,
    PascalCaseCodeSuccessStatuses,
    PascalCaseCodeRedirectStatuses,
    PascalCaseCodeClientStatuses,
    PascalCaseCodeServerStatuses,

    CamelCaseInfoStatuses,
    CamelCaseSuccessStatuses,
    CamelCaseRedirectStatuses,
    CamelCaseClientStatuses,
    CamelCaseServerStatuses,

    PascalCaseInfoStatuses,
    PascalCaseSuccessStatuses,
    PascalCaseRedirectStatuses,
    PascalCaseClientStatuses,
    PascalCaseServerStatuses,

    LowerDashCaseInfoStatuses,
    LowerDashCaseSuccessStatuses,
    LowerDashCaseRedirectStatuses,
    LowerDashCaseClientStatuses,
    LowerDashCaseServerStatuses,

    LowerDotCaseInfoStatuses,
    LowerDotCaseSuccessStatuses,
    LowerDotCaseRedirectStatuses,
    LowerDotCaseClientStatuses,
    LowerDotCaseServerStatuses,

    LowerSnakeCaseInfoStatuses,
    LowerSnakeCaseSuccessStatuses,
    LowerSnakeCaseRedirectStatuses,
    LowerSnakeCaseClientStatuses,
    LowerSnakeCaseServerStatuses,

    UpperDashCaseInfoStatuses,
    UpperDashCaseSuccessStatuses,
    UpperDashCaseRedirectStatuses,
    UpperDashCaseClientStatuses,
    UpperDashCaseServerStatuses,

    UpperDotCaseInfoStatuses,
    UpperDotCaseSuccessStatuses,
    UpperDotCaseRedirectStatuses,
    UpperDotCaseClientStatuses,
    UpperDotCaseServerStatuses,

    UpperSnakeCaseInfoStatuses,
    UpperSnakeCaseSuccessStatuses,
    UpperSnakeCaseRedirectStatuses,
    UpperSnakeCaseClientStatuses,
    UpperSnakeCaseServerStatuses,

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

    describe('Every cased Statuses should have correct status codes', () => {
        const getCodes = (statuses: Statuses) => Object.values(statuses).map(([code]) => code)

        const isInRange = (startInclusive: number, endExclusive: number) =>
            (statusCode: number) => statusCode >= startInclusive && statusCode < endExclusive

        const statusesToTest = {
            Info: [isInRange(100, 200), {
                CamelCaseCodeInfoStatuses,
                PascalCaseCodeInfoStatuses,
                CamelCaseInfoStatuses,
                PascalCaseInfoStatuses,
                LowerDashCaseInfoStatuses,
                LowerDotCaseInfoStatuses,
                LowerSnakeCaseInfoStatuses,
                UpperDashCaseInfoStatuses,
                UpperDotCaseInfoStatuses,
                UpperSnakeCaseInfoStatuses,
            }],
            Success: [isInRange(200, 300), {
                CamelCaseCodeSuccessStatuses,
                PascalCaseCodeSuccessStatuses,
                CamelCaseSuccessStatuses,
                PascalCaseSuccessStatuses,
                LowerDashCaseSuccessStatuses,
                LowerDotCaseSuccessStatuses,
                LowerSnakeCaseSuccessStatuses,
                UpperDashCaseSuccessStatuses,
                UpperDotCaseSuccessStatuses,
                UpperSnakeCaseSuccessStatuses,
            }],
            Redirect: [isInRange(300, 400), {
                CamelCaseCodeRedirectStatuses,
                PascalCaseCodeRedirectStatuses,
                CamelCaseRedirectStatuses,
                PascalCaseRedirectStatuses,
                LowerDashCaseRedirectStatuses,
                LowerDotCaseRedirectStatuses,
                LowerSnakeCaseRedirectStatuses,
                UpperDashCaseRedirectStatuses,
                UpperDotCaseRedirectStatuses,
                UpperSnakeCaseRedirectStatuses,

            }],
            Client: [isInRange(400, 500), {
                CamelCaseCodeClientStatuses,
                PascalCaseCodeClientStatuses,
                CamelCaseClientStatuses,
                PascalCaseClientStatuses,
                LowerDashCaseClientStatuses,
                LowerDotCaseClientStatuses,
                LowerSnakeCaseClientStatuses,
                UpperDashCaseClientStatuses,
                UpperDotCaseClientStatuses,
                UpperSnakeCaseClientStatuses,
            }],
            Server: [isInRange(500, 600), {
                CamelCaseCodeServerStatuses,
                PascalCaseCodeServerStatuses,
                CamelCaseServerStatuses,
                PascalCaseServerStatuses,
                LowerDashCaseServerStatuses,
                LowerDotCaseServerStatuses,
                LowerSnakeCaseServerStatuses,
                UpperDashCaseServerStatuses,
                UpperDotCaseServerStatuses,
                UpperSnakeCaseServerStatuses,
            }]
        } as const

        for (const [statusType, [validate, statusesGroup]] of Object.entries(statusesToTest)) {
            describe(`${statusType} statuses should have correct status code`, () => {

                for (const [name, statuses] of Object.entries(statusesGroup)) {
                    it(name, () => {
                        expect(
                            getCodes(statuses).every(validate),
                            `Invalid ${statusType} status code`
                        ).to.be.true
                    })
                }

            })
        }
    })

    describe(`${isStatuses.name}`, () => {
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