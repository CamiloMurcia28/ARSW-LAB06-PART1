/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;

/**
 *
 * @author hcadavid
 */

@Component
@Qualifier("inMemoryBluePrintPersistence")
public class InMemoryBlueprintPersistence implements BlueprintsPersistence {

    private final Map<Tuple<String, String>, Blueprint> blueprints = new ConcurrentHashMap<>();

    public InMemoryBlueprintPersistence() {
        // load stub data
        Point[] pts1 = new Point[] { new Point(40, 50), new Point(105, 15) };
        Point[] pts2 = new Point[] { new Point(10, 10), new Point(51, 51) };
        Point[] pts3 = new Point[] { new Point(90, 90), new Point(30, 30) };

        Point[] pts4 = new Point[] { new Point(50, 200), new Point(200, 51)
                , new Point(400, 200), new Point(51, 200) , new Point(50, 300), new Point(400, 300) , new Point(400, 201)};

        Point[] pts5 = new Point[] { new Point(185, 30), new Point(190, 10)
        , new Point(195, 30), new Point(180, 20), new Point(200, 20), new Point(180, 31) };

        Blueprint bp1 = new Blueprint("tomas", "plano1", pts1);
        Blueprint bp2 = new Blueprint("tomas", "plano2", pts2);
        Blueprint bp3 = new Blueprint("camilo", "plano3", pts3);
        Blueprint bp4 = new Blueprint("camilo", "casa", pts4);
        Blueprint bp5 = new Blueprint("camilo", "estrella", pts5);

        blueprints.put(new Tuple<>(bp1.getAuthor(), bp1.getName()), bp1);
        blueprints.put(new Tuple<>(bp2.getAuthor(), bp2.getName()), bp2);
        blueprints.put(new Tuple<>(bp3.getAuthor(), bp3.getName()), bp3);
        blueprints.put(new Tuple<>(bp4.getAuthor(), bp4.getName()), bp4);
        blueprints.put(new Tuple<>(bp5.getAuthor(), bp5.getName()), bp5);

    }

    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(), bp.getName()))) {
            throw new BlueprintPersistenceException("The given blueprint already exists: " + bp);
        } else {
            blueprints.putIfAbsent(new Tuple<>(bp.getAuthor(), bp.getName()), bp);
        }
    }

    @Override
    public Set<Blueprint> getAllBlueprints() throws BlueprintNotFoundException {
        Set<Blueprint> authorBlueprints = new HashSet<>();
        for (Tuple<String, String> key : blueprints.keySet()) {
            authorBlueprints.add(getBlueprint(key.o1, key.o2));
        }
        return authorBlueprints;
    }


    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        Blueprint bp = blueprints.get(new Tuple<>(author, bprintname));
        if (bp == null) {
            throw new BlueprintNotFoundException("No se encontró el plano '" + bprintname + "' para el autor: " + author);
        }
        return bp;
    }



    @Override
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> authorBlueprints = new HashSet<>();
        for (Tuple<String, String> key : blueprints.keySet()) {
            if (author.equals(key.o1)) {
                authorBlueprints.add(getBlueprint(key.o1, key.o2));
            }
        }
        return authorBlueprints;
    }

    @Override
    public Set<Blueprint> getBlueprintNames(String author, String bprintname) throws BlueprintNotFoundException {
        Set<Blueprint> resultBlueprints = new HashSet<>();

        for (Tuple<String, String> key : blueprints.keySet()) {

            if (author.equals(key.o1) && bprintname.equals(key.o2)) {
                resultBlueprints.add(getBlueprint(key.o1, key.o2));
            }
        }
        if (resultBlueprints.isEmpty()) {
            throw new BlueprintNotFoundException("No se encontraron planos para el autor: " + author + " con el nombre: " + bprintname);
        }
        return resultBlueprints;
    }

}