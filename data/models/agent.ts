export type Agent={
    id:string,
    type:string,
    principalPort:string|null
    auxiliaryPorts:string[];
}|NumberAgent

type NumberAgent = {
    id: string;
    type: 'Number';
    value: number;
    principalPort: string | null;
};

export type AgentsDictionary={
    [agentId:string]:Agent;
}

export type Connection={
    id:string,
    source:string,
    target:string,
    type:'pricipal'|'auxiliary'
}

export type InteractionNetState={
    agents:AgentsDictionary,
    connections:Connection[]
}

export type InteractionRule={
    sourceType:string,
    targetType:string,
    action:(source:Agent,target:Agent,agents:AgentsDictionary)=>any
}

const rules:InteractionRule[]=[];

function applyInteractionRules(agents:AgentsDictionary){
    for(const agentId in agents){
        const agent=agents[agentId];

        //check for an interaction partner through the principal port
        const partnerId=agent.principalPort;
        if(!partnerId) continue;

        const partner=agents[partnerId];
        if(!partner) continue;


        // find a matching rule to apply
        const rule= rules.find(r=>(
            (r.sourceType===agent.type && r.targetType===partner.type) ||
            (r.sourceType===partner.type && r.targetType===agent.type)
        ));

        if(rule){
            rule.action(agent,partner,agents);
        }
    }
}


const ABInteraction: InteractionRule = {
    sourceType: "A",
    targetType: "B",
    action: (source, target, agents) => {
        if (source.type === "A" && target.type === "B") {
            // Transform A into C
            source.type = "C";
            // Erase the connection to B and remove B
            source.principalPort = null;
            delete agents[target.id];
        } else if (source.type === "B" && target.type === "A") {
            // Similar logic if the roles are reversed
            target.type = "C";
            target.principalPort = null;
            delete agents[source.id];
        }
    }
};

rules.push(ABInteraction);

const additionRule: InteractionRule = {
    sourceType: 'Add',
    targetType: 'Number',  // Although the Add agent interacts with two Numbers, we use Number here for simplicity in this example.
    action: (source, _, agents) => {
        if (source.type === 'Add') {
            const leftNum = agents[source.left as string] as NumberAgent;
            const rightNum = agents[source.right as string] as NumberAgent;

            if (leftNum && rightNum) {
                // Replace Add with the result Number
                const newNumberValue = leftNum.value + rightNum.value;
                const newNumber: NumberAgent = {
                    id: source.id,  // Reuse the ID to replace the Add agent
                    type: 'Number',
                    value: newNumberValue,
                    principalPort: null
                };

                agents[newNumber.id] = newNumber;

                // Remove the old Number agents
                delete agents[leftNum.id];
                delete agents[rightNum.id];
            }
        }
    }
};

rules.push(additionRule);