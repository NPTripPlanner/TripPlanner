

export const slideInOut = (
    direction:'x'|'y'='x',
    stiffness:number=300,
    damping:number=200
    ) => {
    return {
        initial:{
            [direction]:'100%',
            rotate:-45,
        },
        enter:{
            [direction]:0,
            rotate:0,
            transition:{
                [direction]:{ type: "spring", stiffness: stiffness, damping: damping }
            },
        },
        exit:{
            [direction]:'100%',
            rotate:45,
            transition:{
                duration:0.7,
                backout:[0.43, 0.13, 0.23, 0.96],
            },
        },
    };
}

export const opacityInOut = (
    initial:number=0,
    enter:number=1,
    exit:number=0
    ) => {
    return {
        initial:{
            opacity: initial,
        },
        enter:{
            opacity: enter,
        },
        exit:{
            opacity: exit,
        },
    }
}

