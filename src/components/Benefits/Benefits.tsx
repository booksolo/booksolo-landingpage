import BenefitSection from "./BenefitSection"

import { benefits } from "@/data/benefits"

const Benefits: React.FC = () => {
    // Image positions: fitness (right), beauty (left), hairdress (right)
    const imagePositions = [true, false, true]; // true = right, false = left
    
    return (
        <div id="features" className="py-8 md:py-12">
            <h2 className="sr-only">Features</h2>
            {benefits.map((item, index) => {
                return <BenefitSection key={index} benefit={item} imageAtRight={imagePositions[index]} />
            })}
        </div>
    )
}

export default Benefits