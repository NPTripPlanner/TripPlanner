

export const slideInOut = (
    direction:'x'|'y'='x',
    stiffness:number=300,
    damping:number=200,
    staggerChildren:number=0.01
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
                when:'beforeChildren',
                staggerChildren: staggerChildren,
                [direction]:{ type: "spring", stiffness: stiffness, damping: damping },
            },
        },
        exit:{
            [direction]:'100%',
            rotate:45,
            transition:{
                when:'afterChildren',
                duration:0.7,
                backout:[0.43, 0.13, 0.23, 0.96],
            },
        },
    };
}

export const dropIn = (
    stiffness:number=300,
    damping:number=200,
    staggerChildren:number=0.01
    )=>{
    return {
        initial:{
            y:'-100%',
            opacity:0,
        },
        enter:{
            y:0,
            opacity:1,
            transition:{
                when:'beforeChildren',
                staggerChildren: staggerChildren,
                y:{ type: "spring", stiffness: stiffness, damping: damping }
            },
        },
        exit:{
            y:'-100%',
            opacity:0,
            transition:{
                when:'afterChildren',
                duration:0.7,
                backout:[0.43, 0.13, 0.23, 0.96],
            },
        },
    }
}

export const scaleInOut = (
    initial:number=0,
    enter:number=1,
    exit:number=0,
    stiffness:number=300,
    damping:number=200,
    staggerChildren:number=0.01
    ) => {
    return {
        initial:{
            scale: initial,
        },
        enter:{
            scale: enter,
            transition:{
                when:'beforeChildren',
                staggerChildren: staggerChildren,
                y:{ type: "spring", stiffness: stiffness, damping: damping }
            },
        },
        exit:{
            scale: exit,
            transition:{
                when:'afterChildren',
                staggerChildren: staggerChildren,
                y:{ type: "spring", stiffness: stiffness, damping: damping }
            },
        },
    }
}

