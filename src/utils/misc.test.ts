import * as misc from "./misc"
// @ponicode
describe("misc.getTargetLink", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.getTargetLink()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("misc.getIssueTitle", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.getIssueTitle("http://www.croplands.org/account/confirm?t=", undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            misc.getIssueTitle("www.google.com", undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            misc.getIssueTitle("https://twitter.com/path?abc", undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            misc.getIssueTitle("https://accounts.google.com/o/oauth2/revoke?token=%s", undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            misc.getIssueTitle("https://api.telegram.org/", undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            misc.getIssueTitle("", undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("misc.getIssueBody", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.getIssueBody({ originalURL: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", redirectedURL: "http://www.croplands.org/account/confirm?t=", brokenReason: "Error:" }, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            misc.getIssueBody({ originalURL: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", redirectedURL: "www.google.com", brokenReason: "Invalid [%s] value. %s" }, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            misc.getIssueBody({ originalURL: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", redirectedURL: "https://accounts.google.com/o/oauth2/revoke?token=%s", brokenReason: "\n\nThe first error message:\n" }, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            misc.getIssueBody({ originalURL: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", redirectedURL: "https://croplands.org/app/a/confirm?t=", brokenReason: "cannot be found." }, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            misc.getIssueBody({ originalURL: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", redirectedURL: "www.google.com", brokenReason: "No os dependencies found. " }, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            misc.getIssueBody({ originalURL: "", redirectedURL: "", brokenReason: "" }, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("misc.getIssueLabels", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.getIssueLabels()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("misc.getIssueAssignees", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.getIssueAssignees()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("misc.isRecursive", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.isRecursive()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("misc.getInterval", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.getInterval()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("misc.filterInput", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.filterInput("duMMY_nAme", () => undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            misc.filterInput("dummy_name/", () => undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            misc.filterInput("dUMmy_Name/", () => undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            misc.filterInput("/dummy_name", () => undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            misc.filterInput("dummy_name", () => undefined)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            misc.filterInput("", () => undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("misc.getArrayValue", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.getArrayValue("$dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            misc.getArrayValue("dummyName")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            misc.getArrayValue("dummyname")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            misc.getArrayValue("dummy_name/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            misc.getArrayValue("/dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            misc.getArrayValue("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("misc.getNumberValue", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.getNumberValue("dummy_name/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            misc.getNumberValue("dummyName123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            misc.getNumberValue("DUMMYNAME")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            misc.getNumberValue("00")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            misc.getNumberValue("dummyname")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            misc.getNumberValue("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("misc.getBoolValue", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.getBoolValue("$dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            misc.getBoolValue("dummyname")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            misc.getBoolValue("dummyName")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            misc.getBoolValue("dummy_name/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            misc.getBoolValue("DUMMYNAME")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            misc.getBoolValue("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("misc.getStringValue", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.getStringValue("/dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            misc.getStringValue("dummy_name/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            misc.getStringValue("dummyName")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            misc.getStringValue("$dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            misc.getStringValue("dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            misc.getStringValue("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("misc.getHtmlCheckerOptions", () => {
    test("0", () => {
        let callFunction: any = () => {
            misc.getHtmlCheckerOptions()
        }
    
        expect(callFunction).not.toThrow()
    })
})
