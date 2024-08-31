programs = [
  "BioGen",
  "CrysTara",
  "AstroMine",
  "CrystaBloom",
  "EnerGex",
  "StellarCharge",
  "FoamTap",
  "EnerFusion",
  "EnerPlex",
  "TTgenesis",
  "QuantaForge",
  "FortiFyx",
  "SynTitan",
  "SwiftForge",
  "XenoFloral",
  "TitaniumBoost",
  "CerebraSpark",
  "QuiFoam",
  "AstroCharge",
  "EnerGate",
  "CogniMelt",
  "NexiMine",
  "XenoBloom",
  "ResoNex",
  "Fortivest",
  "CogniFy",
  "FortiGen",
  "Abracadabra",
  "MegaBoost",
  "NexuMax",
  "SpicenRich",
  "EvolviFy",
  "NexroVest",
  "QuantumScribe",
  "NeuroForge",
  "CyberPulse",
  "PlasmaShift",
  "IlluGen",
  "Aespa",
  "SuperNova",
  "NeuroCharge",
  "QuantumLeap",
  "BioSynthesis",
  "PlasmaForge",
  "NanoWeave",
  "EtherPulse",
  "StarLight",
  "NovaBurst",
  "BioHarvest",
  "EtherForge",
  "TitanBloom",
  "QuantumFrost",
  "BioFusion",
  "NexusField",
  "StarForge",
  "PlasmaCharge",
  "BioCast",
  "EtherWeave",
  "NovaFlux",
  "QuantumCore",
  "BioSurge",
  "EtherPulse2",
  "StarlightForge",
  "QuantumSurge",
]

import os

base_path = "/Users/charlie/Documents/GitHub/trustless-browser-sandbox/src/games/automata/images/Animations/Programs/"

for program in programs:
    
    correct_dir_name = os.path.join(base_path, program)
    
    
    for dir_name in os.listdir(base_path):
        if dir_name.lower() == program.lower() and dir_name != program:
            actual_dir_name = os.path.join(base_path, dir_name)
            os.rename(actual_dir_name, correct_dir_name)
            print(f"Renamed directory: {actual_dir_name} to {correct_dir_name}")
            break
    else:
        correct_dir_name = os.path.join(base_path, program)

    
    if os.path.isdir(correct_dir_name):
        for img_num in range(24):
            correct_img_name = f"{program}_{img_num:02}.png"
            correct_img_path = os.path.join(correct_dir_name, correct_img_name)
            
            for img_name in os.listdir(correct_dir_name):
                if img_name.lower() == correct_img_name.lower() and img_name != correct_img_name:
                    actual_img_path = os.path.join(correct_dir_name, img_name)
                    os.rename(actual_img_path, correct_img_path)
                    print(f"Renamed image: {actual_img_path} to {correct_img_path}")
                    break

print([dir_name for dir_name in os.listdir(base_path) if dir_name in programs])