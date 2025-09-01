addLayer("1layer", {
    name: "sideLayer1",
    position: -1,
    row: 0,
    symbol() {return ''}, // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolI18N() {return '↓ layer 1 ↓'}, // Second name of symbol for internationalization (i18n) if internationalizationMod is enabled (in mod.js)
    small: true,// Set to true to generate a slightly smaller layer node
    nodeStyle: {"font-size": "15px", "height": "30px"},// Style for the layer button
    startData() { return {
        unlocked: true,
        points: new Decimal(0),// This currently does nothing, but it's required. (Might change later if you add mechanics to this layer.)
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['ex'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})



addLayer("ex", {
    name: "exponents", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol: "Exponent", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0, // Row the layer is in on the tree (0 is the first row)
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        base: new Decimal(0),
        e1: new Decimal(1),
        e2: new Decimal(1),
        e3: new Decimal(1),
        e4: new Decimal(1),
        e5: new Decimal(1),
        e6: new Decimal(1),
        e7: new Decimal(1),
    }},
    color: "#fefefe",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "useless paperclips", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    microtabs:{
        tab:{
            "main":{
                name(){return 'main'}, // Name of tab button
                nameI18N(){return 'main'}, // Second name for internationalization (i18n) if internationalizationMod is enabled
                content:[
                ],
            },
            "another":{
                name(){return 'another'},
                nameI18N(){return 'another'},
                content:[
                ],
            }
        },
    },
    tabFormat: [
       ['display-text', function() { return getPointsDisplay() }],
       ['display-text', function() { return format(player.ex.base) + ' ^ ' + format(player.ex.e1) + ' ^ ' + format(player.ex.e2) + ' ^ ' + format(player.ex.e3) + ' ^ ' + format(player.ex.e4) + ' ^ ' + format(player.ex.e5) + ' ^ ' + format(player.ex.e6) + ' ^ ' + format(player.ex.e7) + ' = ' + format(tmp.ex.formula) }, {'font-size':'20px'}],
       'blank', 'blank',
       'buyables'
       
    ],
    layerShown() { return true },
    formula() { 
        let formula = player.ex.base.pow(player.ex.e1.pow(player.ex.e2.pow(player.ex.e3.pow(player.ex.e4.pow(player.ex.e5.pow(player.ex.e6.pow(player.ex.e7)))))))
        return formula
    },
    update(diff) {
        player.ex.base = player.ex.base.add(buyableEffect('ex', 11).mul(diff))
        player.ex.e1 = player.ex.e1.add(buyableEffect('ex', 12).mul(diff))
        player.ex.e2 = player.ex.e2.add(buyableEffect('ex', 13).mul(diff))
        player.ex.e3 = player.ex.e3.add(buyableEffect('ex', 14).mul(diff))
    },
    buyables: {
    11: {
        style: { 'font-size':'14px' },
        title: 'Base Generator',
        cost(x) { 
            let baseExpo = new Decimal(1)
            let scaling = new Decimal(1.5)

            let expo = baseExpo.mul(Decimal.pow(scaling, x))
            return new Decimal.pow(10, expo)
        },
        display() { return "Cost: " + format(this.cost()) + " Points<br> + " + format(this.effect()) + ' base/sec<br>Bought: ' + getBuyableAmount(this.layer, this.id) },
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        mult() {
            let mult = new Decimal(0.1)
            return mult
        },
        effect(x) {
            return Decimal.mul(this.mult(), x)
        }
    },
    12: {
        style: { 'font-size':'14px' },
        title: '1st Exponent Generator',
        cost(x) { 
            let baseExpo = new Decimal(4)
            let scaling = new Decimal(2)

            let expo = baseExpo.mul(Decimal.pow(scaling, x))
            return new Decimal.pow(10, expo)
        },
        display() { return "Cost: " + format(this.cost()) + " Points<br> + " + format(this.effect()) + ' expo/sec<br>Bought: ' + getBuyableAmount(this.layer, this.id) },
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        mult() {
            let mult = new Decimal(0.001)
            return mult
        },
        effect(x) {
            return Decimal.mul(this.mult(), x)
        }
    },
    13: {
        style: { 'font-size':'14px' },
        title: '2nd Exponent Generator',
        cost(x) { 
            let baseExpo = new Decimal(27)
            let scaling = new Decimal(3)

            let expo = baseExpo.mul(Decimal.pow(scaling, x))
            return new Decimal.pow(10, expo)
        },
        display() { return "Cost: " + format(this.cost()) + " Points<br> + " + format(this.effect()) + ' expo/sec<br>Bought: ' + getBuyableAmount(this.layer, this.id) },
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        mult() {
            let mult = new Decimal(0.001)
            return mult
        },
        effect(x) {
            return Decimal.mul(this.mult(), x)
        }
    },
    14: {
        style: { 'font-size':'14px' },
        title: '3rd Exponent Generator',
        cost(x) { 
            let baseExpo = new Decimal(256)
            let scaling = new Decimal(4)

            let expo = baseExpo.mul(Decimal.pow(scaling, x))
            return new Decimal.pow(10, expo)
        },
        display() { return "Cost: " + format(this.cost()) + " Points<br> + " + format(this.effect()) + ' expo/sec<br>Bought: ' + getBuyableAmount(this.layer, this.id) },
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        mult() {
            let mult = new Decimal(0.001)
            return mult
        },
        effect(x) {
            return Decimal.mul(this.mult(), x)
        }
    },
    },
})

// You can delete the second name from each option if internationalizationMod is not enabled.
// You can use function i18n(text, otherText) to return text in two different languages. Typically, text is English and otherText is Chinese. If changedDefaultLanguage is true, its reversed