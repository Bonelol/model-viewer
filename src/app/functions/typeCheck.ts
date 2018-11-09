import { Types } from '../enums/types.enum';

export function getType(type: string): Types {
    const list = {
        'System.Int32' : Types.Number,
        'System.Int64' : Types.Number,
        'System.Decimal' : Types.Number,
        'System.Double' : Types.Number,
        'System.Long' : Types.Number,
        'System.DateTime' : Types.Date,
        'System.String' : Types.String,
        'System.Boolean' : Types.Boolean
    };

    return list[type] || Types.Object;
}
