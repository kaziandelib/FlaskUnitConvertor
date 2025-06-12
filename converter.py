# Units and conversion factors relative to base units

UNITS = {
    'Length': {
        'meter': 1,
        'kilometer': 1000,
        'centimeter': 0.01,
        'millimeter': 0.001,
        'mile': 1609.34,
        'yard': 0.9144,
        'foot': 0.3048,
        'inch': 0.0254
    },
    'Weight': {
        'kilogram': 1,
        'gram': 0.001,
        'milligram': 0.000001,
        'pound': 0.453592,
        'ounce': 0.0283495
    },
    'Volume': {
        'liter': 1,
        'milliliter': 0.001,
        'cubic meter': 1000,
        'gallon': 3.78541,
        'quart': 0.946353,
        'pint': 0.473176
    },
    'Speed': {
        'meters per second': 1,
        'kilometers per hour': 0.277778,
        'miles per hour': 0.44704,
        'feet per second': 0.3048
    },
    'Temperature': {
        # Special case handled separately
        'celsius': 'celsius',
        'fahrenheit': 'fahrenheit',
        'kelvin': 'kelvin'
    },
    'Time': {
        'second': 1,
        'minute': 60,
        'hour': 3600,
        'day': 86400
    }
}

def convert_value(category, from_unit, to_unit, value):
    if category == 'Temperature':
        return convert_temperature(from_unit, to_unit, value)
    else:
        base_value = value * UNITS[category][from_unit]
        converted = base_value / UNITS[category][to_unit]
        return round(converted, 6)

def convert_temperature(from_unit, to_unit, value):
    # Convert from from_unit to Celsius first
    if from_unit == 'celsius':
        c = value
    elif from_unit == 'fahrenheit':
        c = (value - 32) * 5/9
    elif from_unit == 'kelvin':
        c = value - 273.15
    else:
        raise ValueError('Unsupported temperature unit')

    # Convert Celsius to to_unit
    if to_unit == 'celsius':
        return round(c, 6)
    elif to_unit == 'fahrenheit':
        return round(c * 9/5 + 32, 6)
    elif to_unit == 'kelvin':
        return round(c + 273.15, 6)
    else:
        raise ValueError('Unsupported temperature unit')
